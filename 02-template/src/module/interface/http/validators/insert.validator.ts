import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString, IsUUID } from 'class-validator';

export class InsertValidator {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @Expose()
  @IsNumberString()
  price: number;

  @Type(() => Number)
  @IsNumberString()
  quantity: number;
}
