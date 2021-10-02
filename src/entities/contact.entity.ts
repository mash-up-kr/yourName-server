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
<<<<<<< HEAD

  @IsNotEmpty()
  @IsString()
  @Column()
  iconUrl: string;
=======
>>>>>>> f91d214... Wip: 명함 생성 api 테스트 중
}
