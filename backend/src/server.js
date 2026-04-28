const { app } = require('./app');
const { connectDatabase } = require('./config/database');
const { env } = require('./config/env');
const { reportError } = require('./services/monitoringService');

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Backend de NeuroCarta escuchando en el puerto ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('No se pudo iniciar el servidor', error);
  reportError(error, { type: 'bootstrap_error' }).catch(() => {});
  process.exit(1);
});
