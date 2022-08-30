import { Module } from '@nestjs/common';
import { PokemonModule } from '../pokemon/pokemon.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

// La idea de este módulo es precargar datos ficticios para pruebas.

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // Tenemos que importar el módulo para acceder a su servicio, controlador...
  // Se tratan como Singleton
  // No olvidar en el módulo PokemonModule exportar el servicio, controlador... que necesitemos
  imports: [PokemonModule],
})
export class SeedModule {}
