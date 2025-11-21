import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Clima } from './schemas/clima.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ClimaRepository extends AbstractRepository<Clima> {
  protected readonly logger = new Logger(ClimaRepository.name);

  constructor(
    @InjectModel(Clima.name) climaModel: Model<Clima>,
    @InjectConnection() connection: Connection,
  ) {
    super(climaModel, connection);
  }
}
