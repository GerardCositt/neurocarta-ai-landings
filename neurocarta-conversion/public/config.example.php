<?php
// Copia este archivo como config.php en el servidor y rellena los valores reales.
// NUNCA hagas commit de config.php — está en .gitignore.
//
// Pasos:
//   1. Claves Cloudflare Turnstile: https://dash.cloudflare.com → Turnstile → Add site
//   2. Crea este archivo en httpdocs/config.php con los valores reales
//   3. Verifica que .htaccess bloquea el acceso HTTP a config.php
//
// Clave de prueba Turnstile (siempre pasa, solo para desarrollo):
//   site key:   1x00000000000000000000AA
//   secret key: 1x0000000000000000000000000000000AA

define('SMTP_PASS',        'tu-contrasena-smtp-aqui');
define('TURNSTILE_SECRET', 'tu-clave-secreta-turnstile-aqui');
