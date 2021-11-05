import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { User } from 'src/entities/user.entity';
import { BgColor } from 'src/entities/bg-color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserOnboarding)
    private userOnboardingRepository: Repository<UserOnboarding>,
    @InjectRepository(BgColor)
    private bgColorRepository: Repository<BgColor>,
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

  async getBgColors(userId) {
    const userOnboarding = await this.getUserOnboardings(userId);
    let bgColors = await this.bgColorRepository.find();

    bgColors = bgColors.map((bgColor) => {
      bgColor.value = [bgColor.color1, bgColor.color2, bgColor.color3].filter(
        (value) => value,
      );

      bgColor.isLock =
        userOnboarding[bgColor.userOnboardingField] !== 'DONE' ? true : false;

      delete bgColor.color1;
      delete bgColor.color2;
      delete bgColor.color3;
      delete bgColor.userOnboardingField;

      return bgColor;
    });

    return bgColors;
  }
}
