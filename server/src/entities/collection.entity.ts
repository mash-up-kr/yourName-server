import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BgColor } from './bg-color.entity';
import { CollectionNameCard } from './collection-name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection' })
export class Collection extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ length: 20 })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  bgColorId: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinColumn({ name: 'bgColorId', referencedColumnName: 'id' })
  @ManyToOne(() => BgColor, (bgColor) => bgColor.collections)
  bgColor: BgColor;

  @OneToMany(
    () => CollectionNameCard,
    (collectionNameCard) => collectionNameCard.collection,
  )
  collectionNameCards: CollectionNameCard[];
}
