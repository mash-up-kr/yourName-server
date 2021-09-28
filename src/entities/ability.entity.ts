import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'ability' })
export class Ability extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  gauge: string;

  @IsNumber()
  @Column()
  nameCardId: number;

  @JoinColumn([{ name: 'nameCardId', referencedColumnName: 'id' }])
  @ManyToOne(() => NameCard, (nameCard) => nameCard.abilities, {
    onDelete: 'CASCADE',
  })
  nameCard: NameCard;
}
