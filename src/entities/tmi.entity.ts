import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tmi')
export class Tmi extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  type: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;
}
