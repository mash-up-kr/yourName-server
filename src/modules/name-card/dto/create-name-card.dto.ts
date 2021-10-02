import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { NameCardBgColor } from 'src/entities/name-card-bg-color.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Skill } from 'src/entities/skill.entity';
import { Tmi } from 'src/entities/tmi.entity';

// @todo: 기존 엔티티에서 가져와서 합칠 수 있도록 리팩토링 해보기
export class CreateNameCardDto extends PickType(NameCard, [
  'imageUrl',
  'name',
  'role',
  'personality',
  'introduce',
  'userId',
]) {
  @IsOptional()
  @ApiProperty({
    example: [
      {
        category: '이메일',
        value: 'jkl9510357@gmail.com',
      },
    ],
  })
  contacts?: CreateContactDto[];

  @ApiProperty({
    example: [
      { hexCode: '#181818', order: 1 },
      { hexCode: '#111110', order: 2 },
    ],
  })
  @IsNotEmpty()
  bgColors: CreateBgColorDto[];

  @IsOptional()
  @ApiProperty({
    example: [1, 2, 3],
  })
  tmiIds?: CreateTmiDto[];

  @IsOptional()
  @ApiProperty({
    example: [
      {
        name: '죽은 척 하기',
        level: 2,
        order: 1,
      },
    ],
  })
  skills: CreateSkillDto[];
}

class CreateContactDto {
  @IsNumber()
  id?: number;

  @ApiProperty({ example: '이메일' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'jkl9510357@gmail.com' })
  @IsString()
  value: string;
}

// class CreateBgColorDto extends PickType(NameCardBgColor, ['hexCode']) {}
class CreateTmiDto extends PickType(Tmi, ['id']) {}
class CreateBgColorDto extends PickType(NameCardBgColor, [
  'hexCode',
  'order',
]) {}
class CreateSkillDto {
  name: string;
  level: number;
  order: number;
}
