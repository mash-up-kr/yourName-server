import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateNameCardDto } from './create-name-card.dto';

export class UpdateNameCardDto extends PartialType(CreateNameCardDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  imageId: number;
}
