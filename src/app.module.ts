import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Con esto se pueden desplegar aplicaciones de React, Angular...
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Referencia a la BBDD. Luego se hará con variables de entorno
    MongooseModule.forRoot('mongodb://localhost:27018/nest-pokemon'),

    PokemonModule,

    CommonModule,
  ],
})
export class AppModule {}
