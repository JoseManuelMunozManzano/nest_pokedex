import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Para que transforme la información que fluye por los dto
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // El puerto también se pasa desde la variable de entorno que indica el fichero .env
  await app.listen(3000);
}
bootstrap();
