import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'name_card_contact' })
export class NameCardContact extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  order: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  contactId: number;

  @JoinColumn({ name: 'nameCardId', referencedColumnName: 'id' })
  @ManyToOne(() => NameCard, (nameCard) => nameCard.contacts, {
    onDelete: 'CASCADE',
  })
  nameCard: NameCard;

  @JoinColumn({ name: 'contactId', referencedColumnName: 'id' })
  @ManyToOne(() => Contact)
  contact: Contact;
}
