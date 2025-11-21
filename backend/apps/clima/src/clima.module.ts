import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ClimaController } from './clima.controller';
import { ClimaService } from './clima.service';
import Joi from "joi";
import {DatabaseModule} from "@app/common";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
        }),
          envFilePath: './apps/clima/.env',
      }),
      DatabaseModule,
  ],
  controllers: [ClimaController],
  providers: [ClimaService],
})
export class ClimaModule {}
