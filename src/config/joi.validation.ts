// El paquete para validar nuestros objetos es joi. También lanza errores, poner valores por defecto y,
// en pocas palabras, revisar que un objeto luzca de la manera esperada. En este caso las variables de
// entorno.

// Hay que importarlo así para que funcione
import * as Joi from 'joi';

// Nos creamos ahora el ValidationSchema, es decir, que tenga las propiedades que estoy esperando y que el
// objeto luzca como quiero.
export const JoiValidationschema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
});
