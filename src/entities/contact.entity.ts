import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  category: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  iconUrl: string;
}
