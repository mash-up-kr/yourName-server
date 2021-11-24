import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BgColor } from 'src/entities/bg-color.entity';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { User } from 'src/entities/user.entity';
import { NameCardModule } from '../name-cards/name-cards.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    NameCardModule,
    TypeOrmModule.forFeature([
      Collection,
      NameCard,
      CollectionNameCard,
      User,
      BgColor,
    ]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
