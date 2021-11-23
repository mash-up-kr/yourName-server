import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
import { Image } from 'src/entities/image.entity';
import {
  BgColorSchema,
  ContactSchema,
  NameCardSchema,
  PersonalSkillSchema,
  TmiSchema,
} from 'src/interfaces/namecard.interface';

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
    @InjectRepository(Image)
    private ImageRepository: Repository<Image>,
    private connection: Connection,
  ) {}

  async getMyNameCards(userId: number): Promise<NameCardSchema[]> {
    const _nameCards = await this.nameCardRepository.find({
      where: { userId },
      relations: [
        'user',
        'contacts',
        'contacts.contact',
        'bgColor',
        'image',
        'tmis',
        'tmis.tmi',
        'personalSkills',
        'personalSkills.skill',
      ],
    });

    const nameCards: NameCardSchema[] = _nameCards.map((nameCard) => {
      const bgColor = this._formatingBgColor(nameCard);
      const contacts = this._formatingContact(nameCard);
      const tmis = this._formatingTmi(nameCard);
      const personalSkills = this._formatingPersonalSkill(nameCard);

      return {
        id: nameCard.id,
        name: nameCard.name,
        role: nameCard.role,
        personality: nameCard.personality,
        introduce: nameCard.introduce,
        uniqueCode: nameCard.uniqueCode,
        image: nameCard.image,
        user: nameCard.user,
        bgColor,
        contacts,
        tmis,
        personalSkills,
      };
    });

    return nameCards;
  }

  async createNameCard(
    createNameCardDto: CreateNameCardDto,
  ): Promise<NameCard> {
    const { contacts, tmiIds, skills, imageKey, ...nameCardData } =
      createNameCardDto;
    try {
      nameCardData.imageId = await this._saveImageKey(imageKey);
      nameCardData.uniqueCode = await this._getUniqueCode();

      const nameCard = await this.nameCardRepository.save(nameCardData);

      await Promise.all([
        this._saveContacts(nameCard.id, contacts),
        this._saveTmis(nameCard.id, tmiIds),
        this._saveSkills(nameCard.id, skills),
        this._updateUserOnboarding(nameCardData.userId, 'makeFirstNameCard'),
        this._updateUserOnboarding(nameCardData.userId, 'makeNamCards'),
      ]);

      return await this.nameCardRepository.findOne(nameCard.id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNameCard(
    nameCardId: number,
    updateNameCardDto: UpdateNameCardDto,
  ) {
    const { contacts, tmiIds, skills, imageKey, ...nameCardData } =
      updateNameCardDto;
    try {
      if (updateNameCardDto.imageId && imageKey) {
        await this._updateImageKey(updateNameCardDto.imageId, imageKey);
      }
      await Promise.all([
        this.nameCardRepository.update(nameCardId, nameCardData),
        this._saveContacts(nameCardId, contacts),
        this._saveTmis(nameCardId, tmiIds),
        this._saveSkills(nameCardId, skills),
      ]);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNameCard(nameCardId: number) {
    const imageId = (
      await this.nameCardRepository.findOne({ where: { id: nameCardId } })
    ).imageId;

    await Promise.all([
      this.nameCardRepository.delete(nameCardId),
      this._deleteImageKey(imageId),
    ]);
  }

  async _saveContacts(nameCardId: number, contacts = []) {
    try {
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
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveTmis(nameCardId: number, tmiIds = []) {
    try {
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
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveSkills(nameCardId: number, skills = []) {
    try {
      await Promise.all(
        skills.map(async (skill) => {
          let _skill = await this.skillRepository.findOne({ name: skill.name });
          if (!_skill) {
            _skill = await this.skillRepository.save({ name: skill.name });
          }

          await this.personalSkillRepository.save({
            namecardId: nameCardId,
            skillId: _skill.id,
            level: skill.level,
            order: skill.order,
          });
        }),
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveImageKey(imageKey: string) {
    try {
      const savedImage = await this.ImageRepository.save({
        key: imageKey,
      });
      return savedImage.id;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _updateImageKey(imageId: number, imageKey: string) {
    try {
      const image = await this.ImageRepository.findOne({
        where: { id: imageId },
      });
      if (!image) {
        throw new BadRequestException('image id를 확인해주세요');
      }
      await this.ImageRepository.update(image.id, { key: imageKey });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _deleteImageKey(imageId: number) {
    try {
      const image = await this.ImageRepository.findOne({
        where: { id: imageId },
      });
      if (!image) {
        throw new BadRequestException('image id를 확인해주세요');
      }
      await this.ImageRepository.delete(image);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _updateUserOnboarding(userId: number, updateType: userOnboardingType) {
    const flag = await this._checkCondition(userId, updateType);
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId: userId,
    });
    try {
      if (flag && userOnboarding[updateType] === 'WAIT') {
        userOnboarding[updateType] = 'DONE_WAIT';
        await this.userOnboardingRepository.save(userOnboarding);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _checkCondition(userId: number, updateType: userOnboardingType) {
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

  _formatingBgColor(nameCard: NameCard): BgColorSchema {
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

  _formatingContact(nameCard: NameCard): ContactSchema[] {
    const contact = nameCard.contacts.map((contact) => {
      return {
        category: contact.contact.category,
        value: contact.value,
        iconUrl: contact.contact.iconUrl,
      };
    });

    return contact;
  }

  _formatingTmi(nameCard: NameCard): TmiSchema[] {
    const tmis = nameCard.tmis.map((tmi) => {
      return {
        type: tmi.tmi.type,
        name: tmi.tmi.name,
      };
    });

    return tmis;
  }

  _formatingPersonalSkill(nameCard: NameCard): PersonalSkillSchema[] {
    const personalSkills = nameCard.personalSkills.map((personalSkill) => {
      return {
        name: personalSkill.skill.name,
        level: personalSkill.level,
      };
    });
    return personalSkills;
  }
}
