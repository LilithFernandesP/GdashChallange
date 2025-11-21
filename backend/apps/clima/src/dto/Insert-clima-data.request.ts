import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class InsertClimaDataRequest {
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsDate()
  timestamp: Date;
}
