import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddAndRemoveNamecardsDto {
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  namecardIds: number[];
}
