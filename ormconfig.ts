import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { Contact } from 'src/entities/contact.entity';
import { Image } from 'src/entities/image.entity';
import { NameCardContact } from 'src/entities/name-card-contact.entity';
import { NameCardTmi } from 'src/entities/name-card-tmi.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { PersonalSkill } from 'src/entities/personal-skill.entity';
import { Skill } from 'src/entities/skill.entity';
import { Tmi } from 'src/entities/tmi.entity';
import { User } from 'src/entities/user.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { BgColor } from 'src/entities/bg-color.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT | 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    CollectionNameCard,
    BgColor,
    Collection,
    Contact,
    Image,
    NameCardContact,
    NameCardTmi,
    NameCard,
    PersonalSkill,
    Skill,
    Tmi,
    User,
    UserOnboarding,
  ],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/src/database/migrations',
  },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
};

export = config;
