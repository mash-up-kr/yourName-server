import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 20 })
  nickName: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  providerName: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  refreshToken?: string;
}
