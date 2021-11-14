import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { BgColor } from 'src/entities/bg-color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOnboarding, BgColor])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
