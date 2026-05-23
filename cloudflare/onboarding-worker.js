const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://neurocarta.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    if (!env.RESEND_API_KEY) {
      return jsonResponse({ error: 'Missing RESEND_API_KEY' }, 500)
    }

    const data = await request.json().catch(() => null)
    const name = String(data?.name || '').trim()
    const restaurant = String(data?.restaurant || '').trim()
    const email = String(data?.email || '').trim()
    const phone = String(data?.phone || '').trim()
    const availableSpots = String(data?.availableSpots || '').trim()
    const source = String(data?.source || '').trim()

    if (!name || !restaurant || !email) {
      return jsonResponse({ error: 'Missing required fields' }, 400)
    }

    const html = `
      <h2>Nueva solicitud de onboarding guiado</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Restaurante:</strong> ${escapeHtml(restaurant)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone || 'No indicado')}</p>
      <p><strong>Plazas visibles:</strong> ${escapeHtml(availableSpots || 'No indicado')}</p>
      <p><strong>Origen:</strong> ${escapeHtml(source || 'landing')}</p>
    `

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || 'NeuroCarta.ai <onboarding@neurocarta.ai>',
        to: env.ONBOARDING_TO || 'gerard@cositt.com',
        reply_to: email,
        subject: `Onboarding guiado: ${restaurant}`,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text().catch(() => '')
      return jsonResponse({ error: 'Resend failed', detail: error }, 502)
    }

    return jsonResponse({ ok: true })
  },
}
