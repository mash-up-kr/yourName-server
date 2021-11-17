import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { number, string } from 'joi';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BgColor } from './bg-color.entity';
import { CollectionNameCard } from './collection-name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'collection' })
export class Collection extends BaseEntity {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: number, description: '유저 ID', example: '1' })
  @Column()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '도감 이름',
    example: '매쉬업 너의 이름은 팀',
  })
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
    description: '도감에 대한 설명',
    example: '매쉬업 11기 해커톤 팀 너의 이름은',
  })
  @Column({ length: 20 })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: number, description: '배경색 ID', example: '1' })
  @Column()
  bgColorId: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinColumn({ name: 'bgColorId', referencedColumnName: 'id' })
  @ManyToOne(() => BgColor, (bgColor) => bgColor.collections)
  bgColor: BgColor;

  @OneToMany(
    () => CollectionNameCard,
    (collectionNameCard) => collectionNameCard.collection,
  )
  collectionNameCards: CollectionNameCard[];
}
