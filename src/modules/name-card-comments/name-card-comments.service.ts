import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
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

  async fixNameCardComment(id: number, isFix: boolean, userId: number) {
    if (!(await this.#checkCommentInMyNameCard(userId, id))) {
      throw new ForbiddenException();
    }

    await this.nameCardCommentRepository.update(id, { isFix });
  }

  async privatizeNameCardComment(
    id: number,
    isPrivate: boolean,
    userId: number,
  ) {
    if (!(await this.#checkCommentInMyNameCard(userId, id))) {
      throw new ForbiddenException();
    }

    await this.nameCardCommentRepository.update(id, { isPrivate });
  }

  async deleteNameCardComment(id: number, userId: number) {
    if (!(await this.#checkCommentInMyNameCard(userId, id))) {
      throw new ForbiddenException();
    }

    await this.nameCardCommentRepository.delete(id);
  }

  async #checkCommentInMyNameCard(userId, nameCardCommentId): Promise<boolean> {
    const nameCard = await this.nameCardCommentRepository.findOne({
      where: { id: nameCardCommentId },
      relations: ['nameCard'],
    });

    if (nameCard.userId === userId) {
      return true;
    } else {
      return false;
    }
  }
}
