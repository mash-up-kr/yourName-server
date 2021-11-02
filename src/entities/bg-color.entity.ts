import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Collection } from './collection.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'name_card_bg_color' })
export class BgColor extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  color1: string;

  @IsOptional()
  @IsString()
  @Column()
  color2: string;

  @IsOptional()
  @IsString()
  @Column()
  color3: string;

  @OneToMany(() => NameCard, (nameCard) => nameCard.bgColor, {
    onDelete: 'CASCADE',
  })
  nameCards: NameCard[];

  @OneToMany(() => Collection, (collection) => collection.bgColor, {
    onDelete: 'CASCADE',
  })
  collections: Collection[];
}
