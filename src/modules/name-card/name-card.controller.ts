import { Body, Controller, Post } from '@nestjs/common';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { NameCardService } from './name-card.service';

@Controller('name-card')
export class NameCardController {
  constructor(private readonly nameCardService: NameCardService) {}

  @Post()
  async createNameCard(@Body() createNameCardDto: CreateNameCardDto) {
    console.log('hi');
    return;
    const nameCardId = await this.nameCardService.createNameCard(
      createNameCardDto,
    );
  }
}
