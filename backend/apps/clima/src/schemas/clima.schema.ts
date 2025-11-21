import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Clima extends AbstractDocument {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  generationtime_ms: number;

  @Prop()
  utc_offset_seconds: number;

  @Prop()
  timezone: string;

  @Prop()
  timezone_abbreviation: string;

  @Prop()
  elevation: number;

  @Prop({ type: Object })
  hourly_units: Record<string, any>;

  @Prop({
    type: {
      time: [String],
      temperature_2m: [Number],
      relative_humidity_2m: [Number],
      apparent_temperature: [Number],
      precipitation_probability: [Number],
      rain: [Number],
      snowfall: [Number],
      snow_depth: [Number],
      visibility: [Number],
      wind_speed_10m: [Number],
      uv_index: [Number],
      is_day: [Number],
    },
  })
  hourly: any;
}
export const ClimaSchema = SchemaFactory.createForClass(Clima);
