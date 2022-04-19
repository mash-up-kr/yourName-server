import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Connection, getConnection, Repository } from 'typeorm';

import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Contact } from 'src/entities/contact.entity';
import { Skill } from 'src/entities/skill.entity';
import { Image } from 'src/entities/image.entity';
import { Tmi } from 'src/entities/tmi.entity';

import { CreateNameCardDto } from './dto/create-name-card.dto';
import { UpdateNameCardDto } from './dto/update-name-card.dto';

import { userOnboardingType } from 'src/types/onBoarding.types';
import {
  defaultBgColor,
  defaulImageKey,
} from 'src/constants/name-card.constant';
import {
  BgColorSchema,
  ContactSchema,
  NameCardSchema,
  ParticularNameCardSchema,
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
        'comments',
      ],
    });

    const nameCards: NameCardSchema[] = _nameCards.map((nameCard) => {
      const formattedImage: string = this._formattingImage(nameCard);
      const bgColor: BgColorSchema = this._formattingBgColor(nameCard);
      const contacts: ContactSchema[] = this._formattingContact(nameCard);
      const tmis: TmiSchema[] = this._formattingTmi(nameCard);
      const personalSkills: PersonalSkillSchema[] =
        this._formattingPersonalSkill(nameCard);

      return {
        id: nameCard.id,
        name: nameCard.name,
        role: nameCard.role,
        personality: nameCard.personality,
        introduce: nameCard.introduce,
        uniqueCode: nameCard.uniqueCode,
        imgUrl: formattedImage,
        user: nameCard.user,
        bgColor,
        contacts,
        tmis,
        personalSkills,
        commentCount: nameCard.comments.length,
      };
    });

    return nameCards;
  }

  async getNamecardByUniqueCode(
    userId: number,
    uniqueCode: string,
  ): Promise<ParticularNameCardSchema> {
    try {
      const namecardToFind: NameCard = await this.nameCardRepository.findOne({
        where: { uniqueCode: uniqueCode },
        relations: [
          'image',
          'user',
          'contacts',
          'contacts.contact',
          'bgColor',
          'tmis',
          'tmis.tmi',
          'personalSkills',
          'personalSkills.skill',
          'comments',
        ],
      });

      if (!namecardToFind) {
        return;
      }

      const formattedImage: string = this._formattingImage(namecardToFind);
      const bgColor: BgColorSchema = this._formattingBgColor(namecardToFind);
      const contacts: ContactSchema[] = this._formattingContact(namecardToFind);
      const tmis: TmiSchema[] = this._formattingTmi(namecardToFind);
      const personalSkills: PersonalSkillSchema[] =
        this._formattingPersonalSkill(namecardToFind);

      const namecardToReturn: NameCardSchema = {
        id: namecardToFind.id,
        name: namecardToFind.name,
        role: namecardToFind.role,
        personality: namecardToFind.personality,
        introduce: namecardToFind.introduce,
        uniqueCode: namecardToFind.uniqueCode,
        imgUrl: formattedImage,
        user: namecardToFind.user,
        bgColor,
        contacts,
        tmis,
        personalSkills,
        commentCount: namecardToFind.comments.length,
      };

      const isAdded: boolean = await this.isAddedNameCard(
        userId,
        namecardToReturn,
      );

      const isMine: boolean = this.isMyNameCard(userId, namecardToReturn);

      return { nameCard: namecardToReturn, isAdded: isAdded, isMine: isMine };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async isAddedNameCard(
    userId: number,
    namecard: NameCardSchema,
  ): Promise<boolean> {
    try {
      const isNamecardAdded: CollectionNameCard = await getConnection()
        .createQueryBuilder()
        .select('collectionNamecard')
        .from(CollectionNameCard, 'collectionNamecard')
        .where(
          'collectionNamecard.userId = :userId and collectionNamecard.nameCardId = :nameCardId',
          {
            userId: userId,
            nameCardId: namecard.id,
          },
        )
        .getOne();

      if (isNamecardAdded) {
        return true;
      }
      return false;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  isMyNameCard(userId: number, namecard: NameCardSchema): boolean {
    if (userId == namecard.user.id) {
      return true;
    }
    return false;
  }

  async createNameCard(
    userId: number,
    createNameCardDto: CreateNameCardDto,
  ): Promise<number> {
    const { contacts, tmiIds, skills, imageKey, ...nameCardData } =
      createNameCardDto;
    try {
      const uniqueCode = await this._getUniqueCode();
      let imageId: number;
      if (imageKey) {
        imageId = await this._saveImageKey(imageKey);
      } else imageId = await this._saveImageKey(defaulImageKey);

      const nameCard = new NameCard();
      nameCard.name = nameCardData.name;
      nameCard.personality = nameCardData.personality;
      nameCard.introduce = nameCardData.introduce;
      nameCard.role = nameCardData.role;
      nameCard.bgColorId = nameCardData.bgColorId;
      nameCard.uniqueCode = uniqueCode;
      nameCard.userId = userId;
      nameCard.imageId = imageId;

      await this.nameCardRepository.save(nameCard);

      await Promise.all([
        this._saveContacts(nameCard.id, contacts),
        this._saveTmis(nameCard.id, tmiIds),
        this._saveSkills(nameCard.id, skills),
        this._updateUserOnboarding(userId, 'makeFirstNameCard'),
        this._updateUserOnboarding(userId, 'makeThreeNameCards'),
      ]);

      return nameCard.id;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNameCard(
    namecardUniqueCode: string,
    updateNameCardDto: UpdateNameCardDto,
  ) {
    try {
      const nameCardId: number = (
        await this.nameCardRepository.findOne({
          where: { uniqueCode: namecardUniqueCode },
        })
      ).id;
      const { contacts, tmiIds, skills, imageKey, ...nameCardData } =
        updateNameCardDto;
      if (imageKey) {
        await this._updateImageKey(nameCardId, imageKey);
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

  async deleteNameCard(namecardUniqueCode: string) {
    try {
      const nameCardId: number = (
        await this.nameCardRepository.findOne({
          where: { uniqueCode: namecardUniqueCode },
        })
      ).id;
      const imageId = (
        await this.nameCardRepository.findOne({ where: { id: nameCardId } })
      ).imageId;

      await Promise.all([
        this.nameCardRepository.delete(nameCardId),
        this._deleteImageKey(imageId),
      ]);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async _saveContacts(nameCardId: number, contacts) {
    try {
      if (!contacts) return;

      await this.nameCardContactRepository.delete({ nameCardId });
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

  async _saveTmis(nameCardId: number, tmiIds) {
    try {
      if (!tmiIds) return;

      await this.nameCardTmiRepository.delete({ nameCardId });
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

  // Promise.all([async () => {}, ...]) 형식이 resolve 순서가 보장이 안되서 for 사용해둔 상태
  async _saveSkills(nameCardId: number, skills) {
    try {
      if (!skills) return;

      await this.personalSkillRepository.delete({ namecardId: nameCardId });
      for (const skill of skills) {
        let _skill = await this.skillRepository.findOne({ name: skill.name });
        if (!_skill) {
          _skill = await this.skillRepository.save({ name: skill.name });
        }

        await this.personalSkillRepository.save({
          namecardId: nameCardId,
          skillId: _skill.id,
          level: skill.level,
        });
      }
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

  async _updateImageKey(nameCardId: number, imageKey: string) {
    try {
      const imageId = (
        await this.nameCardRepository.findOne({
          where: { id: nameCardId },
        })
      ).imageId;

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
    } else if (updateType === 'makeThreeNameCards') {
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

  _formattingImage(nameCard: NameCard): string {
    const imageUrl: string = process.env.AWS_S3_PREFIX + nameCard.image.key;

    return imageUrl;
  }

  _formattingBgColor(nameCard: NameCard): BgColorSchema {
    if (!nameCard.bgColorId) {
      return {
        id: null,
        value: defaultBgColor,
      };
    }

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

  _formattingContact(nameCard: NameCard): ContactSchema[] {
    const contacts = nameCard.contacts
      .sort((a, b) => a.contactId - b.contactId)
      .map((contact) => {
        return {
          category: contact.contact.category,
          value: contact.value,
          iconUrl: contact.contact.iconUrl,
        };
      });

    return contacts;
  }

  _formattingTmi(nameCard: NameCard): TmiSchema[] {
    const tmis = nameCard.tmis.map((tmi) => {
      return {
        id: tmi.tmi.id,
        type: tmi.tmi.type,
        name: tmi.tmi.name,
        iconUrl: tmi.tmi.iconUrl,
      };
    });

    return tmis;
  }

  _formattingPersonalSkill(nameCard: NameCard): PersonalSkillSchema[] {
    const personalSkills = nameCard.personalSkills.map((personalSkill) => {
      return {
        name: personalSkill.skill.name,
        level: personalSkill.level,
      };
    });
    return personalSkills;
  }
}
