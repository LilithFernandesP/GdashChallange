import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClimaRepository } from './clima.repository';
import { salvarClimaDataDto } from './dto/Insert-clima-data.request';

@Injectable()
export class ClimaService {
  constructor(private readonly climaRepository: ClimaRepository) {}

  async inserirtClimaData(dto: salvarClimaDataDto) {
    try {
      const payload = {
        ...dto,
        createdAt: new Date(),
      };
      return await this.climaRepository.create(payload);
    } catch (error) {
      console.error('Erro ao salvar dados climáticos:', error);
      throw new InternalServerErrorException('Erro ao salvar dados');
    }
  }

  async GetAllClimaData() {
    return await this.climaRepository.find({});
  }
}
