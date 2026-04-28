# Backend de registro de usuarios

Servicio REST en Node.js + Express para registrar usuarios en NeuroCarta con:

- validacion de email
- hash seguro con `bcrypt`
- prevencion de duplicados
- respuestas JSON estructuradas
- JWT opcional tras el registro

## Instalacion

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Variables de entorno

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/neurocarta
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=20
MONITORING_WEBHOOK_URL=
```

## Endpoint

`POST /api/v1/auth/register`

### Body de ejemplo

```json
{
  "name": "Ana Garcia",
  "email": "ana@neurocarta.ai",
  "password": "ClaveSegura123"
}
```

### Respuesta exitosa `201`

```json
{
  "success": true,
  "message": "Usuario registrado correctamente",
  "data": {
    "user": {
      "name": "Ana Garcia",
      "email": "ana@neurocarta.ai",
      "createdAt": "2026-04-11T10:00:00.000Z",
      "updatedAt": "2026-04-11T10:00:00.000Z",
      "id": "6617e0e7f7d8e4d8b0e63300"
    },
    "auth": {
      "token": "<jwt>",
      "tokenType": "Bearer",
      "expiresIn": "7d"
    }
  }
}
```

## Casos de error

### Email invalido `400`

```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "El correo electronico no es valido",
    "details": null
  }
}
```

### Usuario duplicado `409`

```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_USER",
    "message": "Ya existe un usuario con este correo electronico",
    "details": null
  }
}
```

### Payload incompleto `400`

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "name, email y password son obligatorios",
    "details": {
      "fields": ["name", "email", "password"]
    }
  }
}
```

## Seguridad

- Las contrasenas nunca se guardan en texto plano; solo se persiste `passwordHash`.
- El hash usa `bcrypt` con coste configurable por entorno.
- El email se normaliza a minusculas antes de validar y guardar.
- Hay doble proteccion contra duplicados: comprobacion previa y indice unico en MongoDB.
- La respuesta nunca expone `passwordHash`.
- `JWT_SECRET` debe ser largo, aleatorio y distinto por entorno.
- CORS solo permite los origenes definidos en `ALLOWED_ORIGINS`.
- El endpoint de registro aplica rate limiting por IP y ruta.
- Los errores no controlados pueden enviarse a un webhook de monitorizacion con `MONITORING_WEBHOOK_URL`.
