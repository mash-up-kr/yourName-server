import { Module } from '@nestjs/common';
import { NameCardCommentsService } from './name-card-comments.service';
import { NameCardCommentsController } from './name-card-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameCardComment } from 'src/entities/name-card-comment.entity';
import { NameCard } from 'src/entities/name-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NameCardComment, NameCard])],
  controllers: [NameCardCommentsController],
  providers: [NameCardCommentsService],
})
export class NameCardCommentsModule {}
