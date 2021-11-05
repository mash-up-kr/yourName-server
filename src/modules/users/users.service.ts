import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserOnboarding)
    private userOnboardingRepository: Repository<UserOnboarding>,
  ) {}

  async getUserOnboardings(userId) {
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId,
    });
    return userOnboarding;
  }

  async doneUserOnboarding(userId, onboardingType) {
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId,
    });
    userOnboarding[onboardingType] = true;

    await this.userOnboardingRepository.save(userOnboarding);
  }
  }
}
