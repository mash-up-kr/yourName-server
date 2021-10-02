import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { NameCardTmi } from './name-card-tmi.entity';
import { NameCardContact } from './name-card-contact.entity';
import { NameCardBgColor } from './name-card-bg-color.entity';
@Entity({ name: 'name_card' })
export class NameCard extends BaseEntity {
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  role: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  introduce: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  uniqueCode: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => NameCardTmi, (nameCardTmi) => nameCardTmi.nameCard)
  tmis: NameCardTmi[];

  @OneToMany(
    () => NameCardContact,
    (nameCardContact) => nameCardContact.nameCard,
  )
  contacts: NameCardContact;

  @OneToMany(
    () => NameCardBgColor,
    (NameCardBgColor) => NameCardBgColor.nameCard,
  )
  bgColors: NameCardBgColor;
}
