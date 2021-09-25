import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection' })
export class Collection extends BaseEntity {
  @ManyToOne(() => User, {
    cascade: true,
  })
  user: User;

  @ManyToOne(() => NameCard, {
    cascade: true,
  })
  nameCard: NameCard;
}
