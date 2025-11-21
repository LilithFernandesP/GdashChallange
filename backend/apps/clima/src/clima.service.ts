import { Injectable } from '@nestjs/common';

@Injectable()
export class ClimaService {
  getHello(): string {
    return 'Hello World!';
  }
}
