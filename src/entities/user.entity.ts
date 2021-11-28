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
  @Column()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '인증 provider 이름',
    example: 'Kakao or Apple',
  })
  @Column()
  providerName: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, select: false })
  refreshToken?: string;

  @OneToOne(() => UserOnboarding)
  onboarding: UserOnboarding;
}
