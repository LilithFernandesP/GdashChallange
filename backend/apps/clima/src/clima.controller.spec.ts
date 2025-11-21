import { Test, TestingModule } from '@nestjs/testing';
import { ClimaController } from './clima.controller';
import { ClimaService } from './clima.service';

describe('ClimaController', () => {
  let climaController: ClimaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClimaController],
      providers: [ClimaService],
    }).compile();

    climaController = app.get<ClimaController>(ClimaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(climaController.getHello()).toBe('Hello World!');
    });
  });
});
