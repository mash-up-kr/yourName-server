import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { Contact } from 'src/entities/contact.entity';
import { Image } from 'src/entities/image.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { User } from 'src/entities/user.entity';

class PersonalSillResponseSchema extends PickType(PersonalSkill, ['level']) {
  @ApiProperty({ example: '죽은 척 하기' })
  name: string;
}

class TmiResponseSchema extends PickType(Tmi, ['type', 'name']) {}

class ContactResponseSchema extends PickType(Contact, ['category', 'iconUrl']) {
  @ApiProperty({ example: 'jkl9510357@gmail.com' })
  value: string;
}

export class BgColorResponseSchema {
  @ApiProperty({ example: 1, description: '배경색 ID' })
  id: number;

  @ApiProperty({ example: '#FFCBFD', description: '배경색 값', type: [String] })
  value: string[];
}

class NamecardResponseSchema extends PickType(NameCard, [
  'id',
  'name',
  'role',
  'personality',
  'introduce',
  'uniqueCode',
]) {
  @ApiProperty()
  image: Image;

  @ApiProperty()
  user: User;

  @ApiProperty()
  bgColor: BgColorResponseSchema;

  @ApiProperty({ type: [ContactResponseSchema] })
  contacts: ContactResponseSchema[];

  @ApiProperty({ type: [TmiResponseSchema] })
  tmis: [TmiResponseSchema];

  @ApiProperty({ type: [PersonalSillResponseSchema] })
  personalSkills: PersonalSillResponseSchema[];
}

class ListGetAllNamecardsResponseDto {
  @ApiProperty({ type: [NamecardResponseSchema] })
  list: NamecardResponseSchema[];
}

export class GetManyNamecardsResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: ListGetAllNamecardsResponseDto;
}
