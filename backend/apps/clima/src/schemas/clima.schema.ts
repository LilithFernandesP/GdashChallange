import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Clima extends AbstractDocument {
  @Prop()
  table: string;
  @Prop()
  TimeStamp: Date;
}

export const ClimaSchema = SchemaFactory.createForClass(Clima);
