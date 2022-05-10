import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import {
  fixedColor,
  normalColors,
  privateColor,
} from 'src/constants/name-card-comment.constant';
import { NameCardComment } from 'src/entities/name-card-comment.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Repository } from 'typeorm';
import { CreateNameCardCommentDto } from './dto/create-name-card-comment.dto';

@Injectable()
export class NameCardCommentsService {
  constructor(
    @InjectRepository(NameCardComment)
    private nameCardCommentRepository: Repository<NameCardComment>,
    @InjectRepository(NameCard)
    private nameCardRepository: Repository<NameCard>,
  ) {}

  async getNameCardComments(nameCardId: number, userId: number) {
    await this.nameCardRepository.update(nameCardId, {
      newComment: false,
    });

    const comments = await this.nameCardCommentRepository.find({
      where: { nameCardId },
      order: {
        isFix: 'DESC',
        createdAt: 'DESC',
      },
    });

    comments.map((comment) => (comment.isMine = comment.userId === userId));
    return comments;
  }

  async createNameCardComment(
    userId: number,
    nameCardComment: CreateNameCardCommentDto,
  ) {
    const createNameCardCommentData = {
      userId,
      bgColor: this.#randomColor(),
      ...nameCardComment,
    };

    const result = await this.nameCardCommentRepository.save(
      createNameCardCommentData,
    );

    await this.nameCardRepository.update(nameCardComment.nameCardId, {
      newComment: true,
    });
    return { nameCardCommentId: result.id };
  }

  async fixNameCardComment(id: number, isFix: boolean, userId: number) {
    if (!(await this.#checkCommentInMyNameCard(userId, id))) {
      throw new ForbiddenException();
    }

    const comment = await this.nameCardCommentRepository.findOne(id);
    const fixedComments = await this.nameCardCommentRepository.find({
      nameCardId: comment.nameCardId,
      isFix: true,
    });

    if (fixedComments.length >= 3) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: '명함의 방명록은 3개까지만 상단 고정이 가능합니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.nameCardCommentRepository.update(id, {
      isFix,
      bgColor: isFix ? fixedColor : this.#randomColor(),
    });
  }

  async privatizeNameCardComment(
    id: number,
    isPrivate: boolean,
    userId: number,
  ) {
    if (!(await this.#checkCommentInMyNameCard(userId, id))) {
      throw new ForbiddenException();
    }

    await this.nameCardCommentRepository.update(id, {
      isPrivate,
      bgColor: isPrivate ? privateColor : this.#randomColor(),
    });
  }

  async deleteNameCardComment(id: number, userId: number) {
    const canDelete = await this.#checkCommentCanDelete(userId, id);
    if (!canDelete) {
      throw new ForbiddenException();
    }

    await this.nameCardCommentRepository.delete(id);
  }

  async #checkCommentInMyNameCard(userId, nameCardCommentId): Promise<boolean> {
    const nameCardComment = await this.nameCardCommentRepository.findOne({
      where: { id: nameCardCommentId },
      relations: ['nameCard'],
    });

    if (nameCardComment.nameCard.userId === userId) {
      return true;
    } else {
      return false;
    }
  }

  async #checkNameCardCommentWriter(
    userId,
    nameCardCommentId,
  ): Promise<boolean> {
    const nameCardComment = await this.nameCardCommentRepository.findOne(
      nameCardCommentId,
    );

    if (nameCardComment.userId === userId) {
      return true;
    } else {
      return false;
    }
  }

  async #checkCommentCanDelete(userId, nameCardCommentId): Promise<boolean> {
    return (
      (await this.#checkCommentInMyNameCard(userId, nameCardCommentId)) ||
      (await this.#checkNameCardCommentWriter(userId, nameCardCommentId))
    );
  }

  #randomColor(): string {
    return normalColors[Math.floor(Math.random() * normalColors.length)];
  }
}
