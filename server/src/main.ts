import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: false,
  });
  const port = Number(process.env.PORT) || 4000;
  console.log(`🚀 =====>  Server starting on port ${port}`);
  await app.listen(port, '0.0.0.0');
}

bootstrap();
