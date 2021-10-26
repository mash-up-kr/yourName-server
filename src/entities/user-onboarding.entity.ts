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
  @Column()
  makeFirstNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  shareNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  addNameCollectionNameCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  makeCollection: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  makeNamCards: boolean;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
