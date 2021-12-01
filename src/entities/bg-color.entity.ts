import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Collection } from './collection.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'bg_color' })
export class BgColor extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  color1: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  color2?: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  color3?: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  color4?: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  color5?: string;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  userOnboardingField?:
    | 'makeFirstNameCard'
    | 'shareMyNameCard'
    | 'addFriendNameCard'
    | 'makeNewCollection'
    | 'makeThreeNameCards';

  @IsOptional()
  value: string[];

  @IsOptional()
  @IsBoolean()
  isLock: boolean;

  @OneToMany(() => NameCard, (nameCard) => nameCard.bgColor, {
    onDelete: 'RESTRICT',
  })
  nameCards: NameCard[];

  @OneToMany(() => Collection, (collection) => collection.bgColor, {
    onDelete: 'RESTRICT',
  })
  collections: Collection[];
}
