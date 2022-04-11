import { Module } from '@nestjs/common';
import { NameCardCommentsService } from './name-card-comments.service';
import { NameCardCommentsController } from './name-card-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameCardComment } from 'src/entities/name-card-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NameCardComment])],
  controllers: [NameCardCommentsController],
  providers: [NameCardCommentsService],
})
export class NameCardCommentsModule {}
