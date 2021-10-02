import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'skill' })
export class Skill extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;
}
