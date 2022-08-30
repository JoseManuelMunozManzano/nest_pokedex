import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

// La idea de este módulo es precargar datos ficticios para pruebas.

@Module({
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
