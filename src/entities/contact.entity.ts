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

  @ApiProperty({
    example:
      'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Phone+Number.png',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  iconUrl: string;
}
