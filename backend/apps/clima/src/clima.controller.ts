import { Controller, Get } from '@nestjs/common';
import { ClimaService } from './clima.service';

@Controller()
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Get()
  getHello(): string {
    return this.climaService.getHello();
  }
}
