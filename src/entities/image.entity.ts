import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'image' })
export class Image extends BaseEntity {
  @ApiProperty({ example: 'profile/OCR 솔루션 기능 비교2 (자동 저장됨).xlsx' })
  @IsString()
  @IsNotEmpty()
  @Column()
  key: string;
}
