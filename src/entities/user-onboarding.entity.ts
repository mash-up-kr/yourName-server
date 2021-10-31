import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
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
  @IsBoolean()
  @Column({ default: false })
  makeFirstNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  shareNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  addNameCollectionNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  makeCollection: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  makeNamCards: boolean;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
