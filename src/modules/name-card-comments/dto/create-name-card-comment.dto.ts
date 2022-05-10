import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { NameCardComment } from 'src/entities/name-card-comment.entity';

export class CreateNameCardCommentDto extends PickType(NameCardComment, [
  'nameCardId',
  'nickname',
  'content',
  'isPrivate',
]) {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  nameCardId: number;

  @ApiProperty({
    example: '보여질 닉네임',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '방명록 내용',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isPrivate: boolean;
}
