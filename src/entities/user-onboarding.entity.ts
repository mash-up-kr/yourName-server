import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
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
  makeFirstNameCard: 'WAIT' | 'DONE_WAIT' | 'DONE';

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  saveMeetuMyAlbum: 'WAIT' | 'DONE_WAIT' | 'DONE';

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  addFriendNameCard: 'WAIT' | 'DONE_WAIT' | 'DONE';

  // @IsNotEmpty()
  // @IsString()
  // @Column({ default: 'WAIT' })
  // makeNewCollection: 'WAIT' | 'DONE_WAIT' | 'DONE';

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  makeThreeNameCards: 'WAIT' | 'DONE_WAIT' | 'DONE';

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
