import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // Se importa el ConfigModule para poder usar ConfigService en pokemon.service.ts
    ConfigModule,

    // Para crear la referencias con nuestra colección basado en el esquema que acabamos de crear
    // El name que aparece en Pokemon.name sale de extender de Document. No es el campo name.
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  // Tenemos que exportar para acceder a el fuera de este módulo.
  // Esto es lo que el mundo externo va a conocer de este módulo.
  // También se podría haber exportado PokemonService (el servicio) en vez de Mongoose
  exports: [MongooseModule],
})
export class PokemonModule {}
