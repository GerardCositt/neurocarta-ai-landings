const { env } = require('../config/env');

async function reportError(error, context = {}) {
  const payload = {
    service: 'neurocarta-backend',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    error: {
      name: error?.name || 'Error',
      message: error?.message || 'Error desconocido',
      stack: error?.stack || null
    },
    context
  };

  console.error('[monitoring]', JSON.stringify(payload));

  if (!env.monitoringWebhookUrl) {
    return;
  }

  try {
    await fetch(env.monitoringWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (monitoringError) {
    console.error(
      '[monitoring] no se pudo enviar el error al webhook',
      monitoringError
    );
  }
}

module.exports = { reportError };
