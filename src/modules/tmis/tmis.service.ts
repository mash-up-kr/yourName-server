import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tmi } from '../../entities/tmi.entity';

@Injectable()
export class TmisService {
  constructor(
    @InjectRepository(Tmi)
    private tmisRepository: Repository<Tmi>,
  ) {}

  async findBehaviorTmis() {
    return this.tmisRepository.find({ where: { type: '취미 / 관심사' } });
  }

  async findCharacterTmis() {
    return this.tmisRepository.find({ where: { type: '성격' } });
  }
}
