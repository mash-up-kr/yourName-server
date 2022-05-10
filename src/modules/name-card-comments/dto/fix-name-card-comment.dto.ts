import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { NameCardComment } from 'src/entities/name-card-comment.entity';

export class FixNameCardCommentDto extends PickType(NameCardComment, [
  'id',
  'isFix',
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
  isFix: boolean;
}
