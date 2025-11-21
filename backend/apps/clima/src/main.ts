import { NestFactory } from '@nestjs/core';
import { ClimaModule } from './clima.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ClimaModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
