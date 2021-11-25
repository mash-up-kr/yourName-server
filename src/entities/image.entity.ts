import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'image' })
export class Image extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'testUrl' })
  @Column()
  key: string;
}
