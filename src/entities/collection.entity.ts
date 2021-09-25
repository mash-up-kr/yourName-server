import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection' })
export class Collection extends BaseEntity {
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    cascade: true,
  })
  user: User;

  @JoinColumn({ name: 'nameCardId', referencedColumnName: 'id' })
  @ManyToOne(() => NameCard, {
    cascade: true,
  })
  nameCard: NameCard;
}
