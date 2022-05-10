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
import { ApiDocs } from './name-card-comments.docs';
import { NameCardCommentsService } from './name-card-comments.service';

@ApiTags('NameCardComment - 명함 방명록')
@UseGuards(JwtAuthGuard)
@Controller('namecards/:nameCardId/comments')
export class NameCardCommentsController {
  constructor(
    private readonly nameCardCommentsService: NameCardCommentsService,
  ) {}

  @Get()
  @ApiDocs.getNameCardComments('명함의 방명록들 가져오기')
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
  @ApiDocs.createNameCardComment('방명록 작성')
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
  @ApiDocs.fixNameCardComment('명함의 방명록 상단 고정')
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
  @ApiDocs.privatizeNameCardComment('명함 방명록 비공개 처리')
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
  @ApiDocs.deleteNameCardComment('방명록 삭제')
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
