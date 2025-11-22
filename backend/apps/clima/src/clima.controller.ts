import {Body, Controller, Get, Post} from '@nestjs/common';
import { ClimaService } from './clima.service';
import { salvarClimaDataDto } from './dto/Insert-clima-data.request';

@Controller('clima')
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Post()
  async inserirClimaData(@Body() request: salvarClimaDataDto) {
    return this.climaService.inserirtClimaData(request);
  }

  @Get()
  async listaClimaData() {
    return this.climaService.GetAllClimaData();
  }
}
