import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { NameCardTmi } from './name-card-tmi.entity';
import { NameCardContact } from './name-card-contact.entity';
import { NameCardBgColor } from './name-card-bg-color.entity';
import { PersonalSkill } from './personal-skill.entity';
import { DateTimeEntity } from './date-time.entity';
import { Image } from './image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'name_card' })
export class NameCard extends DateTimeEntity {
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ example: '거뇌 명함' })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({ example: '노개(노드 개발자라는 뜻^^' })
  @IsString()
  @IsNotEmpty()
  @Column()
  role: string;

  @ApiProperty({ example: 'ENFP / 머리가 꽃밭' })
  @IsString()
  @IsNotEmpty()
  @Column()
  personality: string;

  @ApiProperty({ example: '안녕하세요' })
  @IsString()
  @IsNotEmpty()
  @Column()
  introduce: string;

  //@todo: uniqueCode 함수 적용 후 optional type 해제
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  uniqueCode?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @IsNumber()
  @IsOptional()
  @Column()
  imageId: string;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(
    () => NameCardContact,
    (nameCardContact) => nameCardContact.nameCard,
  )
  contacts?: NameCardContact;

  @OneToMany(
    () => NameCardBgColor,
    (nameCardBgColor) => nameCardBgColor.nameCard,
  )
  bgColors: NameCardBgColor;

  @OneToMany(() => NameCardTmi, (nameCardTmi) => nameCardTmi.nameCard)
  tmis?: NameCardTmi[];

  @OneToMany(() => PersonalSkill, (personalSkill) => personalSkill.namecard, {
    cascade: true,
  })
  personalSkills: PersonalSkill[];

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;
}
