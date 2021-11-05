import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Skill } from 'src/entities/skill.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { Repository } from 'typeorm';
import { CreateNameCardDto } from './dto/create-name-card.dto';
import { UpdateNameCardDto } from './dto/update-name-card.dto';
import { userOnboardingType } from 'src/utils/types';

@Injectable()
export class NameCardService {
  constructor(
    @InjectRepository(NameCard)
    private nameCardRepository: Repository<NameCard>,
    @InjectRepository(NameCardContact)
    private nameCardContactRepository: Repository<NameCardContact>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(NameCardTmi)
    private nameCardTmiRepository: Repository<NameCardTmi>,
    @InjectRepository(Tmi)
    private tmiRepository: Repository<Tmi>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(PersonalSkill)
    private personalSkillRepository: Repository<PersonalSkill>,
    @InjectRepository(UserOnboarding)
    private userOnboardingRepository: Repository<UserOnboarding>,
  ) {}

  async getMyNameCards(userId: number) {
    return await this.nameCardRepository.find({
      where: { userId },
      relations: [
        'user',
        'contacts',
        'contacts.contact',
        'bgColor',
        'tmis',
        'personalSkills',
      ],
    });
  }

  //@todo: Transaction 처리
  async createNameCard(
    createNameCardDto: CreateNameCardDto,
  ): Promise<NameCard> {
    const { contacts, tmiIds, skills, ...nameCardData } = createNameCardDto;

    //@todo: UniqueCode 코드
    const nameCard = await this.nameCardRepository.save(nameCardData);

    await Promise.all([
      this._saveContacts(nameCard.id, contacts),
      this._saveTmis(nameCard.id, tmiIds),
      this._saveSkills(nameCard.id, skills),
      this._updateUserOnboarding(nameCardData.userId, 'makeFirstNameCard'),
      this._updateUserOnboarding(nameCardData.userId, 'makeNamCards'),
    ]);

    return await this.nameCardRepository.findOne(nameCard.id, {
      relations: [
        'user',
        'contacts',
        'contacts.contact',
        'bgColor',
        'tmis',
        'personalSkills',
      ],
    });
  }

  async updateNameCard(
    nameCardId: number,
    updateNameCardDto: UpdateNameCardDto,
  ) {
    const { contacts, tmiIds, skills, ...nameCardData } = updateNameCardDto;

    await Promise.all([
      this.nameCardRepository.update(nameCardId, nameCardData),
      this._saveContacts(nameCardId, contacts),
      this._saveTmis(nameCardId, tmiIds),
      this._saveSkills(nameCardId, skills),
    ]);
  }

  async deleteNameCard(nameCardId: number) {
    await this.nameCardRepository.delete(nameCardId);
  }

  async _saveContacts(nameCardId, contacts = []) {
    await Promise.all(
      contacts.map(async (contact) => {
        const _contact = await this.contactRepository.findOne({
          category: contact.category,
        });

        if (!_contact) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: '존재하지 않는 Contact Category',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        await this.nameCardContactRepository.save({
          value: contact.value,
          nameCardId: nameCardId,
          contactId: _contact.id,
        });
      }),
    );
  }

  async _saveTmis(nameCardId, tmiIds = []) {
    await Promise.all(
      tmiIds.map(async (tmiId) => {
        const tmi = await this.tmiRepository.findOne(tmiId);

        if (!tmi) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: '존재하지 않는 TMI 유형입니다',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        await this.nameCardTmiRepository.save({
          nameCardId: nameCardId,
          tmiId: tmi.id,
        });
      }),
    );
  }

  async _saveSkills(nameCardId, skills = []) {
    await Promise.all(
      skills.map(async (skill) => {
        let _skill = await this.skillRepository.findOne({ name: skill.name });

        if (!_skill) {
          _skill = await this.skillRepository.save({ name: skill.name });
        }

        await this.personalSkillRepository.save({
          namecardId: nameCardId,
          skiilId: _skill.id,
          level: skill.level,
          order: skill.order,
        });
      }),
    );
  }

  async _updateUserOnboarding(userId, updateType: userOnboardingType) {
    const flag = await this._checkCondition(userId, updateType);
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId: userId,
    });

    if (flag && userOnboarding[updateType] === 'WAIT') {
      userOnboarding[updateType] = 'DONE_WAIT';
      this.userOnboardingRepository.save(userOnboarding);
    }
  }

  async _checkCondition(userId, updateType: userOnboardingType) {
    if (updateType === 'makeFirstNameCard') {
      return true;
    } else if (updateType === 'makeNamCards') {
      const namecards = await this.getMyNameCards(userId);
      return namecards.length >= 3 ? true : false;
    }
  }
}
