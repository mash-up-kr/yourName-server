import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { NameCardTmi } from './name-card-tmi.entity';
import { NameCardContact } from './name-card-contact.entity';
import { NameCardBgColor } from './name-card-bg-color.entity';
import { PersonalSkill } from './personal-skill.entity';
import { DateTimeEntity } from './date-time.entity';

@Entity({ name: 'name_card' })
export class NameCard extends DateTimeEntity {
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

  @OneToMany(
    () => NameCardContact,
    (nameCardContact) => nameCardContact.nameCard,
  )
  contacts: NameCardContact;

  @OneToMany(
    () => NameCardBgColor,
    (nameCardBgColor) => nameCardBgColor.nameCard,
  )
  bgColors: NameCardBgColor;

  @OneToMany(() => NameCardTmi, (nameCardTmi) => nameCardTmi.nameCard)
  nameCardTmis: NameCardTmi[];

  @OneToMany(() => PersonalSkill, (personalSkill) => personalSkill.namecard, {
    cascade: true,
  })
  personalSkills: PersonalSkill[];
}
