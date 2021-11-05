import { Module } from '@nestjs/common';
import { NameCardService } from './name-card.service';
import { NameCardController } from './name-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameCard } from 'src/entities/name-card.entity';
import { Contact } from 'src/entities/contact.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Skill } from 'src/entities/skill.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NameCard,
      NameCardContact,
      Contact,
      NameCardTmi,
      Tmi,
      Skill,
      PersonalSkill,
      UserOnboarding,
    ]),
  ],
  controllers: [NameCardController],
  providers: [NameCardService],
})
export class NameCardModule {}
