import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserOnboarding])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
