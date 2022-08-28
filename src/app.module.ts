import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // Con esto se pueden desplegar aplicaciones de React, Angular...
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
  })],
})
export class AppModule {}
