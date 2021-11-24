import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: 'Success' })
  message: string;
}
