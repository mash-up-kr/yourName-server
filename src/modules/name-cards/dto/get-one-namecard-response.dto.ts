import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { Contact } from 'src/entities/contact.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { User } from 'src/entities/user.entity';

class PersonalSillResponseSchema extends PickType(PersonalSkill, ['level']) {
  @ApiProperty({ example: '죽은 척 하기' })
  name: string;
}

class TmiResponseSchema extends PickType(Tmi, [
  'id',
  'type',
  'name',
  'iconUrl',
]) {}

class ContactResponseSchema extends PickType(Contact, ['category', 'iconUrl']) {
  @ApiProperty({ example: 'jkl9510357@gmail.com' })
  value: string;
}

export class BgColorResponseSchema {
  @ApiProperty({ example: 1, description: '배경색 ID' })
  id: number;

  @ApiProperty({
    example: ['#FFCBFD'],
    description: '배경색 값',
    type: [String],
  })
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
  @ApiProperty({
    example: 'https://erme.s3.ap-northeast-2.amazonaws.com/testurl',
  })
  imgUrl: string;

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

class GetOneNameCardSchema {
  @ApiProperty()
  nameCard: NamecardResponseSchema;

  @ApiProperty({ example: false, description: '도감에 추가한 명함인지' })
  isAdded: boolean;

  @ApiProperty({ example: true })
  isMine: boolean;
}

export class GetOneNameCardResponseDto extends CommonResponseDto {
  @ApiProperty()
  data: GetOneNameCardSchema;
}
