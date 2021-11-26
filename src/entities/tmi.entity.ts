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

  @ApiProperty({
    example: 'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_food.png',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  iconUrl: string;
}
