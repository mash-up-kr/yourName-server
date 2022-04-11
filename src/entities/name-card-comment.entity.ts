import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DateTimeEntity } from './date-time.entity';
import { NameCard } from './name-card.entity';
import { User } from './user.entity';

@Entity({ name: 'name_card_comment' })
export class NameCardComment extends DateTimeEntity {
  @ApiProperty({ example: '닉네임' })
  @IsString()
  @IsNotEmpty()
  @Column()
  nickname: string;

  @ApiProperty({ example: '방명록 내용' })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ApiProperty({ example: '공개여부' })
  @IsString()
  @IsNotEmpty()
  @Column({ default: false })
  isPrivate: boolean;

  @ApiProperty({ example: '고정여부' })
  @IsString()
  @IsNotEmpty()
  @Column({ default: false })
  isFix: boolean;

  @ApiProperty({ example: '유저 id' })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @ApiProperty({ example: '명함 id' })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  nameCardId: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => NameCard, (nameCard) => nameCard.comments)
  nameCard: NameCard;
}
