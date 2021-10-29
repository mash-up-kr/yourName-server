import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionNameCard } from 'src/entities/collection-name-card.entity';
import { Collection } from 'src/entities/collection.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { User } from 'src/entities/user.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, NameCard, CollectionNameCard, User]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
