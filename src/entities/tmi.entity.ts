import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tmi')
export class Tmi extends BaseEntity {
  @ApiProperty({ example: '취미 / 관심사' })
  @IsString()
  @IsNotEmpty()
  @Column()
  type: string;

  @ApiProperty({ example: '게임' })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;
}
