import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'name_card' })
export class NameCard extends BaseEntity {
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  role: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  introduce: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contact1: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contact2: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contact3: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contact4: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contact5: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    cascade: true,
  })
  user: User;
}
