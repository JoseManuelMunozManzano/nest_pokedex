// También se le suele denominar env.config.ts ya que es la configuración del archivo de las variables
// de entorno.
// Se exporta una función que mapea las variables de entorno.
export const EnvConfiguration = () => ({
  // Si la variable de entorno no esta declarada en el fichero .env, por ejemplo con
  // el valor de producción 'prod', por defecto será 'dev'
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
