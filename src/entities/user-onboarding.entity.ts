import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

type status = 'WAIT' | 'DONE_WAIT' | 'DONE';

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
  makeFirstNameCard: status;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  shareNameCard: status;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  addNameCollectionNameCard: status;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  makeCollection: status;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'WAIT' })
  makeNamCards: status;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
