import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column({length: 20})
  nickName: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  providerID: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  providerName: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  refreshToken?: string;
}
