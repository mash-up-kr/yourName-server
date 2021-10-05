import { PartialType } from '@nestjs/swagger';
import { CreateNameCardDto } from './create-name-card.dto';

export class UpdateNameCardDto extends PartialType(CreateNameCardDto) {}
