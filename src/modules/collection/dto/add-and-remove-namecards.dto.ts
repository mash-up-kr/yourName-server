import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { number } from 'joi';

export class AddAndRemoveNamecardsDto {
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({ type: number, description: '명함 ID들', example: '[1,2,3]' })
  namecardIds: number[];
}
