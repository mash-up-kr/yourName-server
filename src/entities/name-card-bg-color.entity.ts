import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NameCard } from './name-card.entity';

@Entity({ name: 'name_card_bg_color' })
export class NameCardBgColor extends BaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @Column()
  nameCardId: number;

  @ApiProperty({
    example: ['#181818', '#101010'],
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  hexCode: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  order: number;

  @ManyToOne(() => NameCard, (nameCard) => nameCard.bgColors, {
    onDelete: 'CASCADE',
  })
  nameCard: NameCard;
}
