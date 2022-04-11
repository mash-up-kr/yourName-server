import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NameCardComment } from 'src/entities/name-card-comment.entity';
import { Repository } from 'typeorm';
import { CreateNameCardCommentDto } from './dto/create-name-card-comment.dto';

@Injectable()
export class NameCardCommentsService {
  constructor(
    @InjectRepository(NameCardComment)
    private nameCardCommentRepository: Repository<NameCardComment>,
  ) {}

  async getNameCardComments(nameCardId: number) {
    return await this.nameCardCommentRepository.find({
      where: { nameCardId },
      order: {
        isFix: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async createNameCardComment(
    userId: number,
    nameCardComment: CreateNameCardCommentDto,
  ) {
    const createNameCardCommentData = {
      userId,
      ...nameCardComment,
    };

    const result = await this.nameCardCommentRepository.save(
      createNameCardCommentData,
    );
    return { nameCardCommentId: result.id };
  }
}
