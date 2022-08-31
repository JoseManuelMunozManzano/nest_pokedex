import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    // Cargando variables de entorno del fichero .env
    // Si esta sentencia no está no se cargan esas variables de entorno
    // Las variables de entorno, por defecto, siempre son strings, aunque se pueden convertir.
    ConfigModule.forRoot(),

    // Con esto se pueden desplegar aplicaciones de React, Angular...
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Referencia a la BBDD
    // Para utilizar variables de entorno se crea en la raiz un archivo llamado .env y se añade al
    // archivo .gitignore para no exponer en GitHub las credenciales de la BD.
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {
  // Ya existen variables de entorno cuando está ejecutándose nuestra app en Node.
  // Mirar este ejemplo.
  // Veremos que las variables de entorno que hemos declarado en .env no van a aparecer.
  //
  // Tenemos que decirle a Nest que lea el archivo .env y carga esas variables de entorno para que
  // se puedan utilizar. Se hace instalando @nestjs/config y añadiendo una configuración arriba en
  // los imports al inicio.
  constructor() {
    console.log(process.env);
  }
}
