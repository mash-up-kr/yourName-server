import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { userOnboardingStatusType } from 'src/types/onBoarding.types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'user_onboarding' })
export class UserOnboarding extends BaseEntity {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  makeFirstNameCard: userOnboardingStatusType;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  shareMyNameCard: userOnboardingStatusType;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  addFriendNameCard: userOnboardingStatusType;

  // @IsNotEmpty()
  // @IsString()
  // @Column({ default: 'WAIT' })
  // makeNewCollection: userOnboardingStatusType;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  makeThreeNameCards: userOnboardingStatusType;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
