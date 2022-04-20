import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNameCardCommentDto } from './dto/create-name-card-comment.dto';
import { DeleteNameCardCommentDto } from './dto/delete-name-card-comment.dto';
import { FixNameCardCommentDto } from './dto/fix-name-card-comment.dto';
import { PrivatizeNameCardCommentDto } from './dto/privatize-name-card-comment.dto';
import { NameCardCommentsService } from './name-card-comments.service';

@ApiTags('NameCardComment - 명함 방명록')
@UseGuards(JwtAuthGuard)
@Controller('namecards/:nameCardId/comments')
export class NameCardCommentsController {
  constructor(
    private readonly nameCardCommentsService: NameCardCommentsService,
  ) {}

  @Get()
  async getNameCardComments(
    @AuthUser() user: User,
    @Param('nameCardId') nameCardId: number,
  ) {
    const nameCardComments =
      await this.nameCardCommentsService.getNameCardComments(
        nameCardId,
        user.id,
      );
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

  @Put('/fix')
  async fixNameCardComment(
    @AuthUser() user: User,
    @Body() fixNameCardCommentDto: FixNameCardCommentDto,
  ) {
    await this.nameCardCommentsService.fixNameCardComment(
      fixNameCardCommentDto.id,
      fixNameCardCommentDto.isFix,
      user.id,
    );
  }

  @Put('/privatize')
  async privatizeNameCardComment(
    @AuthUser() user: User,
    @Body() privatizeNameCardCommentDto: PrivatizeNameCardCommentDto,
  ) {
    await this.nameCardCommentsService.privatizeNameCardComment(
      privatizeNameCardCommentDto.id,
      privatizeNameCardCommentDto.isPrivate,
      user.id,
    );
  }

  @Delete()
  async deleteNameCardComment(
    @AuthUser() user: User,
    @Body() deleteNameCardCommentDto: DeleteNameCardCommentDto,
  ) {
    await this.nameCardCommentsService.deleteNameCardComment(
      deleteNameCardCommentDto.id,
      user.id,
    );
  }
}
