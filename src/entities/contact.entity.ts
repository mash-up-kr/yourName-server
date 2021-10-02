import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @ApiProperty({ example: '이메일' })
  @IsNotEmpty()
  @IsString()
  @Column()
  category: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  iconUrl: string;
}
