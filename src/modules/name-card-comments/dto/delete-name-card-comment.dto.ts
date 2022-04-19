import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { NameCardComment } from 'src/entities/name-card-comment.entity';

export class DeleteNameCardCommentDto extends PickType(NameCardComment, [
  'id',
]) {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  id: number;
}
