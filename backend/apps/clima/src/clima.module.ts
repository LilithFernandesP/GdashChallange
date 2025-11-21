import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClimaController } from './clima.controller';
import { ClimaService } from './clima.service';
import Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { ClimaRepository } from './clima.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Clima, ClimaSchema } from './schemas/clima.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/clima/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Clima.name, schema: ClimaSchema }]),
  ],
  controllers: [ClimaController],
  providers: [ClimaService, ClimaRepository],
})
export class ClimaModule {}
