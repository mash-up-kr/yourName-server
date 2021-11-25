import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;
}
