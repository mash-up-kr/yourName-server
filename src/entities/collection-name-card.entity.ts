import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Collection } from './collection.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'collection_name_card' })
export class CollectionNameCard extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  collectionId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @JoinColumn({ name: 'nameCardId', referencedColumnName: 'id' })
  @ManyToOne(() => NameCard, {
    onDelete: 'CASCADE',
  })
  nameCard: NameCard;

  @JoinColumn({ name: 'collectionId', referencedColumnName: 'id' })
  @ManyToOne(() => Collection, (collection) => collection.collectionNameCards, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
