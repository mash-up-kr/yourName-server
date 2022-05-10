import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';
import { UserOnboarding } from './user-onboarding.entity';
import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';
import { NameCardComment } from './name-card-comment.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '유저 Identifier',
    example: '000602.374a47cb915b4119940a82e3fdaa20ec.0835',
  })
  @Column()
  userIdentifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '인증 provider 이름',
    example: 'Kakao or Apple',
  })
  @Column()
  providerName?: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, select: false })
  refreshToken?: string;

  @OneToOne(() => UserOnboarding)
  onboarding?: UserOnboarding;

  @OneToMany(() => NameCardComment, (nameCardComment) => nameCardComment.user)
  comments: NameCardComment[];
}
