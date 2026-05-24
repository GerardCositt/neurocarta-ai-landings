<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

function clean($v)   { return trim(strip_tags((string)($v ?? ''))); }
function no_hdrs($v) { return preg_replace('/[\r\n\t]/', ' ', $v); }

$name    = no_hdrs(clean($data['name']    ?? ''));
$email   = filter_var(clean($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone   = no_hdrs(clean($data['phone']   ?? ''));
$message = clean($data['message']         ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nombre, email y mensaje son obligatorios.']);
    exit;
}

// ===================== SMTP =====================
define('SMTP_HOST',      'mail.neurocarta.ai');
define('SMTP_PORT',      465);
define('SMTP_USER',      'hola@neurocarta.ai');
define('SMTP_PASS',      '4wfzR%672');
define('SMTP_FROM_NAME', 'NeuroCarta.ai');

function smtp_read($fp) {
    $out = '';
    do { $line = fgets($fp, 512); $out .= $line; }
    while (strlen($line) >= 4 && $line[3] === '-');
    return $out;
}

function smtp_send($to, $subject, $html) {
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $fp  = stream_socket_client('ssl://' . SMTP_HOST . ':' . SMTP_PORT, $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) return "Conn: $errstr";
    stream_set_timeout($fp, 30);

    $steps = [
        ''                                    => '220',
        "EHLO neurocarta.ai\r\n"              => '250',
        "AUTH LOGIN\r\n"                      => '334',
        base64_encode(SMTP_USER) . "\r\n"     => '334',
        base64_encode(SMTP_PASS) . "\r\n"     => '235',
        "MAIL FROM:<" . SMTP_USER . ">\r\n"   => '250',
        "RCPT TO:<$to>\r\n"                   => '250',
        "DATA\r\n"                            => '354',
    ];
    foreach ($steps as $cmd => $expect) {
        if ($cmd) fwrite($fp, $cmd);
        $r = smtp_read($fp);
        if (substr($r, 0, 3) !== $expect) { fclose($fp); return "SMTP $expect: $r"; }
    }

    $enc  = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $body = "From: " . SMTP_FROM_NAME . " <" . SMTP_USER . ">\r\nTo: $to\r\nSubject: $enc\r\n"
          . "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nDate: " . date('r') . "\r\n\r\n"
          . preg_replace('/^\.$/m', '..', $html) . "\r\n.\r\n";
    fwrite($fp, $body);
    $r = smtp_read($fp);
    if (substr($r, 0, 3) !== '250') { fclose($fp); return "MSG: $r"; }
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return true;
}

// ===================== Ejecutar =====================
$confirmHtml = <<<HTML
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0F0F0F;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F0F;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:580px;background:#1a1a1a;border-radius:12px;border:1px solid rgba(255,255,255,0.1);">
      <tr><td style="background:#C52439;padding:24px 32px;border-radius:12px 12px 0 0;">
        <img src="https://neurocarta.ai/butterfly.svg" alt="" width="40" height="40" style="display:block;margin-bottom:8px;"/>
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:900;">NeuroCarta<span style="color:#FFC107;">.ai</span></h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">Carta digital que vende</p>
      </td></tr>
      <tr><td style="padding:32px;">
        <h2 style="margin:0 0 12px;color:#fff;font-size:18px;">Hola, {$name} 👋</h2>
        <p style="margin:0 0 16px;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.6;">
          Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.
        </p>
        <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin:20px 0;">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Tu mensaje</p>
          <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.6;">{$message}</p>
        </div>
        <p style="margin:24px 0 0;color:rgba(255,255,255,0.45);font-size:13px;">
          ¿Urgente? Escríbenos a <a href="mailto:hola@neurocarta.ai" style="color:#FFC107;text-decoration:none;">hola@neurocarta.ai</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;

$phoneStr = $phone ? $phone : '—';
$notifyHtml = <<<HTML
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#333;padding:24px;">
  <h2 style="margin:0 0 16px;font-size:18px;">🦋 Nuevo contacto desde neurocarta.ai</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px;">
    <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:110px;">Nombre</td><td style="padding:8px 12px;border:1px solid #eee;">$name</td></tr>
    <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #eee;"><a href="mailto:$email">$email</a></td></tr>
    <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Teléfono</td><td style="padding:8px 12px;border:1px solid #eee;">{$phoneStr}</td></tr>
    <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;vertical-align:top;">Mensaje</td><td style="padding:8px 12px;border:1px solid #eee;">$message</td></tr>
  </table>
</body></html>
HTML;

$r1 = smtp_send($email,                   'Hemos recibido tu mensaje — NeuroCarta.ai', $confirmHtml);
$r3 = smtp_send('gerard@cositt.com',      "🦋 Nuevo contacto web: $name",              $notifyHtml);
$r4 = smtp_send('francoise@cositt.com',   "🦋 Nuevo contacto web: $name",              $notifyHtml);
$r5 = smtp_send('neurocarta@cositt.net',  "🦋 Nuevo contacto web: $name",              $notifyHtml);

if ($r1 !== true) error_log('contact.php confirm r1='   . var_export($r1, true));
if ($r3 !== true) error_log('contact.php gerard r3='    . var_export($r3, true));
if ($r4 !== true) error_log('contact.php francoise r4=' . var_export($r4, true));
if ($r5 !== true) error_log('contact.php odoo r5='      . var_export($r5, true));

// Éxito si al menos uno de los emails internos llega
if ($r3 !== true && $r4 !== true && $r5 !== true) {
    error_log('contact.php all notify failed');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Error al enviar. Escríbenos a hola@neurocarta.ai']);
    exit;
}

echo json_encode(['ok' => true]);
