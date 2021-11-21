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
import { Connection, Repository } from 'typeorm';
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
    private connection: Connection,
  ) {}

  async getMyNameCards(userId: number) {
    const _nameCards = await this.nameCardRepository.find({
      where: { userId },
      relations: [
        'user',
        'contacts',
        'contacts.contact',
        'bgColor',
        'tmis',
        'tmis.tmi',
        'personalSkills',
        'personalSkills.skill',
      ],
    });

    const nameCards = _nameCards.map((nameCard) => {
      const bgColor = this._formatingBgColor(nameCard);
      const contacts = this._formatingContact(nameCard);
      const tmis = this._formatingTmi(nameCard);
      const personalSkills = this._formatingPersonalSkill(nameCard);

      return {
        ...nameCard,
        bgColor,
        contacts,
        tmis,
        personalSkills,
      };
    });

    return nameCards;
  }

  //@todo: Transaction 처리
  async createNameCard(
    createNameCardDto: CreateNameCardDto,
  ): Promise<NameCard> {
    const { contacts, tmiIds, skills, ...nameCardData } = createNameCardDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      nameCardData.uniqueCode = await this._getUniqueCode();

      const nameCard = await queryRunner.manager
        .getRepository(NameCard)
        .save(nameCardData);

      await Promise.all([
        this._saveContacts(nameCard.id, contacts),
        this._saveTmis(nameCard.id, tmiIds),
        this._saveSkills(nameCard.id, skills),
        this._updateUserOnboarding(nameCardData.userId, 'makeFirstNameCard'),
        this._updateUserOnboarding(nameCardData.userId, 'makeNamCards'),
      ]);

      return await queryRunner.manager
        .getRepository(NameCard)
        .findOne(nameCard.id, {
          relations: [
            'user',
            'contacts',
            'contacts.contact',
            'bgColor',
            'tmis',
            'personalSkills',
          ],
        });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async updateNameCard(
    nameCardId: number,
    updateNameCardDto: UpdateNameCardDto,
  ) {
    const { contacts, tmiIds, skills, ...nameCardData } = updateNameCardDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all([
        queryRunner.manager
          .getRepository(NameCard)
          .update(nameCardId, nameCardData),
        this._saveContacts(nameCardId, contacts),
        this._saveTmis(nameCardId, tmiIds),
        this._saveSkills(nameCardId, skills),
      ]);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteNameCard(nameCardId: number) {
    await this.nameCardRepository.delete(nameCardId);
  }

  async _saveContacts(nameCardId, contacts = []) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        contacts.map(async (contact) => {
          const _contact = await queryRunner.manager
            .getRepository(Contact)
            .findOne({
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
          await queryRunner.manager.getRepository(NameCardContact).save({
            value: contact.value,
            nameCardId: nameCardId,
            contactId: _contact.id,
          });
        }),
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async _saveTmis(nameCardId, tmiIds = []) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        tmiIds.map(async (tmiId) => {
          const tmi = await queryRunner.manager
            .getRepository(Tmi)
            .findOne(tmiId);
          if (!tmi) {
            throw new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: '존재하지 않는 TMI 유형입니다',
              },
              HttpStatus.NOT_FOUND,
            );
          }
          await queryRunner.manager.getRepository(NameCardTmi).save({
            nameCardId: nameCardId,
            tmiId: tmi.id,
          });
        }),
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async _saveSkills(nameCardId, skills = []) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        skills.map(async (skill) => {
          let _skill = await queryRunner.manager
            .getRepository(Skill)
            .findOne({ name: skill.name });
          if (!_skill) {
            _skill = await queryRunner.manager
              .getRepository(Skill)
              .save({ name: skill.name });
          }

          await queryRunner.manager.getRepository(PersonalSkill).save({
            namecardId: nameCardId,
            skiilId: _skill.id,
            level: skill.level,
            order: skill.order,
          });
        }),
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async _updateUserOnboarding(userId, updateType: userOnboardingType) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const flag = await this._checkCondition(userId, updateType);
    const userOnboarding = await queryRunner.manager
      .getRepository(UserOnboarding)
      .findOne({
        userId: userId,
      });
    try {
      if (flag && userOnboarding[updateType] === 'WAIT') {
        userOnboarding[updateType] = 'DONE_WAIT';
        await queryRunner.manager
          .getRepository(UserOnboarding)
          .save(userOnboarding);
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async _checkCondition(userId, updateType: userOnboardingType) {
    if (updateType === 'makeFirstNameCard') {
      return true;
    } else if (updateType === 'makeNamCards') {
      const nameCards = await this.getMyNameCards(userId);
      return nameCards.length >= 3 ? true : false;
    }
  }

  async _getUniqueCode() {
    let uniqueCode = this._makeRandomString();

    const nameCard = await this.nameCardRepository.findOne({ uniqueCode });

    if (nameCard) {
      uniqueCode = await this._getUniqueCode();
    }

    return uniqueCode;
  }

  _makeRandomString(length = 6) {
    let randomString = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++)
      randomString += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );

    return randomString;
  }

  _formatingBgColor(nameCard: NameCard) {
    const value = [
      ...Object.keys(nameCard.bgColor)
        .filter((key) => key.includes('color'))
        .map((color) => nameCard.bgColor[color]),
    ].filter((value) => value);

    return {
      id: nameCard.bgColor.id,
      value,
    };
  }

  _formatingContact(nameCard: NameCard) {
    const contact = nameCard.contacts.map((contact) => {
      return {
        category: contact.contact.category,
        value: contact.value,
        iconUrl: contact.contact.iconUrl,
      };
    });

    return contact;
  }

  _formatingTmi(nameCard: NameCard) {
    const tmis = nameCard.tmis.map((tmi) => {
      return {
        type: tmi.tmi.type,
        name: tmi.tmi.name,
      };
    });

    return tmis;
  }

  _formatingPersonalSkill(nameCard: NameCard) {
    const personalSkills = nameCard.personalSkills.map((personalSkill) => {
      return {
        name: personalSkill.skill.name,
        level: personalSkill.level,
      };
    });
    return personalSkills;
  }
}
