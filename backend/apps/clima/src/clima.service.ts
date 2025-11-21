import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClimaRepository } from './clima.repository';
import { salvarClimaDataDto } from './dto/Insert-clima-data.request';
import { HourlyRecord } from './interfaces/clima.interface';

@Injectable()
export class ClimaService {
  constructor(private readonly climaRepository: ClimaRepository) {}

  async inserirtClimaData(dto: salvarClimaDataDto) {
    try {
      const recordsCount = dto.hourly.time.length;

      const hourlyRecords: HourlyRecord[] = [];

      for (let i = 0; i < recordsCount; i++) {
        hourlyRecords.push({
          time: dto.hourly.time[i],
          temperature: dto.hourly.temperature_2m[i],
          humidity: dto.hourly.relative_humidity_2m[i],
          apparent_temperature: dto.hourly.apparent_temperature[i],
          precipitation_probability: dto.hourly.precipitation_probability[i],
          rain: dto.hourly.rain[i],
          snowfall: dto.hourly.snowfall[i],
          snow_depth: dto.hourly.snow_depth[i],
          visibility: dto.hourly.visibility[i],
          wind_speed: dto.hourly.wind_speed_10m[i],
          uv_index: dto.hourly.uv_index[i],
          is_day: dto.hourly.is_day[i],
        });
      }

      // Objeto final a ser salvo
      const payload = {
        latitude: dto.latitude,
        longitude: dto.longitude,
        elevation: dto.elevation,
        timezone: dto.timezone,
        hourly_units: dto.hourly_units,
        hourly: hourlyRecords,
        generationtime_ms: dto.generationtime_ms,
        utc_offset_seconds: dto.utc_offset_seconds,
        timezone_abbreviation: dto.timezone_abbreviation,
        createdAt: new Date(),
      };

      return await this.climaRepository.create(payload);
    } catch (error) {
      console.error('Erro ao salvar dados climáticos:', error);
      throw new InternalServerErrorException('Erro ao salvar dados');
    }
  }
}
