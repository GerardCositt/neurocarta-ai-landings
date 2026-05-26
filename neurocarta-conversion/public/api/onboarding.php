<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ===================== Config =====================
$config = dirname(__DIR__) . '/config.php';
if (!file_exists($config)) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Server configuration missing.']);
    exit;
}
require_once $config;

// ===================== Helpers =====================
function clean($v)   { return trim(strip_tags((string)($v ?? ''))); }
function no_hdrs($v) { return preg_replace('/[\r\n\t]/', ' ', $v); }

function checkRateLimit($action, $ip, $limit = 5, $window = 900) {
    $file = sys_get_temp_dir() . '/nc_rl_' . md5($ip . $action);
    $now  = time();
    $hits = [];
    if (is_readable($file)) {
        foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $t) {
            if ($now - (int)$t < $window) $hits[] = (int)$t;
        }
    }
    if (count($hits) >= $limit) return false;
    $hits[] = $now;
    @file_put_contents($file, implode("\n", $hits) . "\n");
    return true;
}

function verifyTurnstile($token, $ip) {
    if (empty($token)) return false;
    $secret = defined('TURNSTILE_SECRET') ? TURNSTILE_SECRET : '';
    if (empty($secret)) return true;
    $ctx = stream_context_create(['http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $ip]),
        'timeout' => 5,
        'ignore_errors' => true,
    ]]);
    $res = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx);
    if ($res === false) return true;
    $json = json_decode($res, true);
    return !empty($json['success']);
}

// ===================== Input =====================
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

$ip = $_SERVER['REMOTE_ADDR'];

// Honeypot
if (!empty($data['website'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Bot detected.']);
    exit;
}

// Rate limit: 5 envíos por IP cada 15 minutos
if (!checkRateLimit('onboarding', $ip)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Demasiados intentos. Espera unos minutos.']);
    exit;
}

// Turnstile
$turnstileToken = clean($data['cf-turnstile-response'] ?? '');
if (!verifyTurnstile($turnstileToken, $ip)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Verificación de seguridad fallida. Recarga y vuelve a intentarlo.']);
    exit;
}

$name       = no_hdrs(clean($data['name']         ?? ''));
$restaurant = no_hdrs(clean($data['restaurant']    ?? ''));
$email      = filter_var(clean($data['email']      ?? ''), FILTER_VALIDATE_EMAIL);
$phone      = no_hdrs(clean($data['phone']         ?? ''));
$spots      = no_hdrs(clean($data['availableSpots'] ?? ''));

if (!$name || !$email) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nombre y email son obligatorios.']);
    exit;
}

// ===================== SMTP =====================
define('SMTP_HOST',      'mail.neurocarta.ai');
define('SMTP_PORT',      465);
define('SMTP_USER',      'hola@neurocarta.ai');
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

// ===================== Emails =====================
$restaurantRow = $restaurant ? "<tr><td style='padding:8px 12px;background:#f9f7f0;font-weight:bold;'>Restaurante</td><td style='padding:8px 12px;border:1px solid #eee;'>$restaurant</td></tr>" : '';
$phoneRow      = $phone      ? "<tr><td style='padding:8px 12px;background:#f9f7f0;font-weight:bold;'>Teléfono</td><td style='padding:8px 12px;border:1px solid #eee;'>$phone</td></tr>" : '';
$spotsRow      = $spots      ? "<tr><td style='padding:8px 12px;background:#f9f7f0;font-weight:bold;'>Plazas</td><td style='padding:8px 12px;border:1px solid #eee;'>$spots</td></tr>" : '';

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
        <h2 style="margin:0 0 12px;color:#fff;font-size:18px;">¡Plaza reservada, {$name}! 🎉</h2>
        <p style="margin:0 0 16px;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.6;">
          Hemos recibido tu solicitud de arranque guiado. Te contactaremos en breve para confirmar fecha y hora.
        </p>
        <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin:20px 0;">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Tu solicitud</p>
          <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;">
            <strong style="color:rgba(255,255,255,0.5);">Nombre:</strong> {$name}<br>
            {$restaurant}
          </p>
        </div>
        <p style="margin:24px 0 0;color:rgba(255,255,255,0.45);font-size:13px;">
          ¿Dudas? Escríbenos a <a href="mailto:hola@neurocarta.ai" style="color:#FFC107;text-decoration:none;">hola@neurocarta.ai</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;

$notifyHtml = <<<HTML
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#333;padding:24px;">
  <h2 style="margin:0 0 16px;font-size:18px;">🦋 Nueva solicitud de arranque guiado</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px;">
    <tr><td style="padding:8px 12px;background:#f9f7f0;font-weight:bold;width:110px;">Nombre</td><td style="padding:8px 12px;border:1px solid #eee;">$name</td></tr>
    <tr><td style="padding:8px 12px;background:#f9f7f0;font-weight:bold;">Email</td><td style="padding:8px 12px;border:1px solid #eee;"><a href="mailto:$email">$email</a></td></tr>
    {$restaurantRow}{$phoneRow}{$spotsRow}
  </table>
  <p style="margin-top:20px;color:#999;font-size:12px;">Desde el formulario de arranque guiado — neurocarta.ai</p>
</body></html>
HTML;

$r1 = smtp_send($email,              '¡Plaza reservada! — NeuroCarta.ai',          $confirmHtml);
$r2 = smtp_send('gerard@cositt.com', "🦋 Arranque guiado: $name ($restaurant)",    $notifyHtml);

if ($r1 !== true) {
    error_log('onboarding.php confirm: ' . var_export($r1, true));
}
if ($r2 !== true) {
    error_log('onboarding.php notify: ' . var_export($r2, true));
}

echo json_encode(['ok' => true]);
