import { NestFactory } from '@nestjs/core';
import { ClimaModule } from './clima.module';

async function bootstrap() {
  const app = await NestFactory.create(ClimaModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
