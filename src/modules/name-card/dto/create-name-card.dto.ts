import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { NameCardBgColor } from 'src/entities/name-card-bg-color.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Tmi } from 'src/entities/tmi.entity';

// @todo: 기존 엔티티에서 가져와서 합칠 수 있도록 리팩토링 해보기
export class CreateNameCardDto {
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ example: '거뇌 명함' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '노개(노드 개발자라는 뜻^^' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'ENFP / 머리가 꽃밭' })
  @IsString()
  @IsNotEmpty()
  personality: string;

  @ApiProperty({ example: '안녕하세요' })
  @IsString()
  @IsNotEmpty()
  introduce: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: [
      {
        category: '이메일',
        value: 'jkl9510357@gmail.com',
      },
    ],
  })
  contacts?: any[];

  @ApiProperty({
    example: ['#181818', '#101010'],
  })
  bgColors?: string[];

  @ApiProperty({
    example: [1, 2, 3],
  })
  tmiIds?: number[];
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

class CreateBgColorDto extends PickType(NameCardBgColor, ['hexCode']) {}
class CreateTmiDto extends PickType(Tmi, ['id']) {}

class CreateDto extends PickType(NameCard, ['introduce']) {
  bgColors: string[];
}
