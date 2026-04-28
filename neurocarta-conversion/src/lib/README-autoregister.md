# Registro automatico en frontend

## Flujo

- La landing intenta registrar al usuario automaticamente cuando pulsa una CTA principal.
- Si la URL contiene `?autoregister=1`, el registro se dispara al cargar la pagina.
- Si ya existe una sesion guardada en `localStorage`, no vuelve a llamar al backend.

## Persistencia local

Se usa la clave `neurocarta:auto-register` para guardar:

- `user`
- `token`
- `tokenType`
- `expiresIn`
- `credentials`
- `registeredAt`

## Variables de entorno

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_AUTO_REGISTER_EMAIL_DOMAIN=autoreg.neurocarta.ai
```
