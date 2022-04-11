import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NameCardCommentsService } from './name-card-comments.service';

@ApiTags('NameCardComment - 명함 방명록')
// @UseGuards(JwtAuthGuard)
@Controller('namecards/:nameCardId/comments')
export class NameCardCommentsController {
  constructor(
    private readonly nameCardCommentsService: NameCardCommentsService,
  ) {}

  @Get()
  async getNameCardComments(@Param('nameCardId') nameCardId: number) {
    const nameCardComments =
      await this.nameCardCommentsService.getNameCardComments(nameCardId);
    console.log('comments : ', nameCardComments);
    return nameCardComments;
  }
}
