import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';
import { Tmi } from './tmi.entity';

@Entity({ name: 'name_card_tmi' })
export class NameCardTmi extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  tmiId: number;

  @JoinColumn([{ name: 'nameCardId', referencedColumnName: 'id' }])
  @ManyToOne(() => NameCard, (nameCard) => nameCard.nameCardTmis, {
    onDelete: 'CASCADE'
  })
  nameCard: NameCard;

  @JoinColumn([{ name: 'tmiId', referencedColumnName: 'id' }])
  @ManyToOne(() => Tmi)
  tmi: Tmi;
}
