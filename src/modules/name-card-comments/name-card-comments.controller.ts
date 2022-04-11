import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNameCardCommentDto } from './dto/create-name-card-comment.dto';
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
    return nameCardComments;
  }

  @Post()
  async createNameCardComment(
    @AuthUser() user: User,
    @Body() createNameCardCommentDto: CreateNameCardCommentDto,
  ) {
    return this.nameCardCommentsService.createNameCardComment(
      user.id,
      createNameCardCommentDto,
    );
  }
}
