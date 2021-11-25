import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Skill } from './skill.entity';
import { NameCard } from './name-card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'personal_skill' })
export class PersonalSkill extends BaseEntity {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  level: number;

  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 1 })
  order: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  namecardId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  skillId: number;

  @JoinColumn([{ name: 'skillId', referencedColumnName: 'id' }])
  @ManyToOne(() => Skill)
  skill: Skill;

  @JoinColumn([{ name: 'namecardId', referencedColumnName: 'id' }])
  @ManyToOne(() => NameCard, {
    onDelete: 'CASCADE',
  })
  namecard: NameCard;
}
