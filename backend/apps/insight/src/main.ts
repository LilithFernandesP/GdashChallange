import { NestFactory } from '@nestjs/core';
import { InsightModule } from './insight.module';

async function bootstrap() {
  const app = await NestFactory.create(InsightModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
