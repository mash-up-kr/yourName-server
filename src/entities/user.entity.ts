import { Column, Entity, OneToOne } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';
import { UserOnboarding } from './user-onboarding.entity';
import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '유저의 닉네임',
    example: 'AlwaysLee',
  })
  @Column({ length: 20 })
  nickName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '인증 provider 이름',
    example: 'Kakao',
  })
  @Column()
  providerName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: string,
    description: '리프레시 토큰',
    example: 'qwe123e32easfd!@#@45?23r2w',
  })
  @Column({ nullable: true })
  refreshToken?: string;

  @OneToOne(() => UserOnboarding)
  onboarding: UserOnboarding;
}
