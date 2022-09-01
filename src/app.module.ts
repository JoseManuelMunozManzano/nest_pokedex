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
    // Adicionalmente al Configuration Root, cuando hacemos uso de las variables de entorno dentro de un
    // building block (provider, servicio, controlador) se recomienda que hagamos uso del Configuration
    // Module, pero este ofrece un servicio que nos va a permitir hacer la inyección de dependencias de
    // las variables de entorno, entre otras cosas.
    // Ver pokemon.service.ts
    ConfigModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
