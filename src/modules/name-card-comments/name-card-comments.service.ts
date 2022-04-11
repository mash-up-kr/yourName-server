import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NameCardComment } from 'src/entities/name-card-comment.entity';
import { Repository } from 'typeorm';

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
}
