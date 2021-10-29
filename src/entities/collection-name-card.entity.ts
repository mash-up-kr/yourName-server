import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Collection } from './collection.entity';
import { NameCard } from './name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection_name_card' })
export class CollectionNameCard extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: User;

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

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
