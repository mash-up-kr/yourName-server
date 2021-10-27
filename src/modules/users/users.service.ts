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

  async getOnboarding(userId) {
    const onboarding = await this.userOnboardingRepository.findOne({ userId });
    return onboarding;
  }

  async doneOnboarding(userId, onboardingType) {
    const onboarding = await this.userOnboardingRepository.findOne({ userId });
    onboarding[onboardingType] = true;

    await this.userOnboardingRepository.save(onboarding);
  }
}
