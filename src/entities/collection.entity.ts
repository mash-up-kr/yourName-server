import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection' })
export class Collection extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinColumn({ name: 'nameCardId', referencedColumnName: 'id' })
  @ManyToOne(() => NameCard, {
    onDelete: 'CASCADE',
  })
  nameCard: NameCard;
}
