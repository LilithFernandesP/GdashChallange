import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { InsertClimaDataRequest } from './dto/Insert-clima-data.request';

@Controller()
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Post()
  async insertClimaData(@Body() request: InsertClimaDataRequest) {
    return this.climaService.insertClimaData(request);
  }
}
