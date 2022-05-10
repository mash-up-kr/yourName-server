import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { NameCardComment } from 'src/entities/name-card-comment.entity';

export class PrivatizeNameCardCommentDto extends PickType(NameCardComment, [
  'id',
  'isPrivate',
]) {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isPrivate: boolean;
}
