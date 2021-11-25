import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { NameCard } from 'src/entities/name-card.entity';
import { Tmi } from 'src/entities/tmi.entity';

// @todo: 기존 엔티티에서 가져와서 합칠 수 있도록 리팩토링 해보기
export class CreateNameCardDto extends PickType(NameCard, [
  'name',
  'role',
  'personality',
  'introduce',
  'bgColorId',
  'imageId',
]) {
  @IsOptional()
  @ApiProperty({
    example: 'profile/apple.jpg',
  })
  imageKey?: string;

  @IsOptional()
  @ApiProperty({
    example: [
      {
        category: 'Email.',
        value: 'jkl9510357@gmail.com',
      },
    ],
  })
  contacts?: CreateContactDto[];

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
class CreateSkillDto {
  name: string;
  level: number;
  order: number;
}
