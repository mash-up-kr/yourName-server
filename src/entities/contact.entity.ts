import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
}
