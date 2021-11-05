import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { User } from 'src/entities/user.entity';
import { BgColor } from 'src/entities/bg-color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private userOnboardingImageUrlMap = {
    makeFirstNameCard: {
      WAIT: '',
      DONE_WAIT: '',
      DONE: '',
    },
    shareNameCard: {
      WAIT: '',
      DONE_WAIT: '',
      DONE: '',
    },
    addNameCollectionNameCard: {
      WAIT: '',
      DONE_WAIT: '',
      DONE: '',
    },
    makeCollection: {
      WAIT: '',
      DONE_WAIT: '',
      DONE: '',
    },
    makeNamCards: {
      WAIT: '',
      DONE_WAIT: '',
      DONE: '',
    },
  };
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

    const list = Object.keys(this.userOnboardingImageUrlMap).map((key) => {
      return {
        status: userOnboarding[key],
        imageUrl: this.userOnboardingImageUrlMap[key][userOnboarding[key]],
      };
    });

    return { list };
  }

  async doneUserOnboarding(userId, onboardingType) {
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId,
    });
    userOnboarding[onboardingType] = 'DONE';

    console.log(userOnboarding);
    await this.userOnboardingRepository.save(userOnboarding);
  }

  async doneWaitUserOnboarding(userId, onboardingType) {
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId,
    });
    userOnboarding[onboardingType] = 'DONE_WAIT';

    await this.userOnboardingRepository.save(userOnboarding);
  }

  async getBgColors(userId) {
    const userOnboarding = await this.userOnboardingRepository.findOne({
      userId,
    });
    let bgColors = await this.bgColorRepository.find();

    bgColors = bgColors.map((bgColor) => {
      bgColor.value = [bgColor.color1, bgColor.color2, bgColor.color3].filter(
        (value) => value,
      );

      bgColor.isLock =
        bgColor.value.length > 1 &&
        userOnboarding[bgColor.userOnboardingField] !== 'DONE'
          ? true
          : false;

      delete bgColor.color1;
      delete bgColor.color2;
      delete bgColor.color3;
      delete bgColor.userOnboardingField;

      return bgColor;
    });

    return bgColors;
  }
}
