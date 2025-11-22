import { IsNumber, IsString, IsObject, IsArray } from 'class-validator';

export class salvarClimaDataDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  generationtime_ms: number;

  @IsNumber()
  utc_offset_seconds: number;

  @IsString()
  timezone: string;

  @IsString()
  timezone_abbreviation: string;

  @IsNumber()
  elevation: number;

  @IsObject()
  hourly_units: Record<string, any>;

  @IsObject()
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    rain: number[];
    snowfall: number[];
    snow_depth: number[];
    visibility: number[];
    wind_speed_10m: number[];
    uv_index: number[];
    is_day: number[];
  };
}
