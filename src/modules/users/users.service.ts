import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { User } from 'src/entities/user.entity';
import { BgColor } from 'src/entities/bg-color.entity';
import { Repository } from 'typeorm';
import userOnboardingImageUrlMap from 'src/constants/userOnboardingImageUrlMap';

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

    const list = Object.keys(userOnboardingImageUrlMap).map((key) => {
      return {
        status: userOnboarding[key],
        imageUrl: userOnboardingImageUrlMap[key][userOnboarding[key]],
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
      bgColor.value = [
        bgColor.color1,
        bgColor.color2,
        bgColor.color3,
        bgColor.color4,
        bgColor.color5,
      ].filter((value) => value);

      bgColor.isLock =
        bgColor.value.length > 1 &&
        userOnboarding[bgColor.userOnboardingField] !== 'DONE'
          ? true
          : false;

      delete bgColor.color1;
      delete bgColor.color2;
      delete bgColor.color3;
      delete bgColor.color4;
      delete bgColor.color5;
      delete bgColor.userOnboardingField;

      return bgColor;
    });

    return bgColors;
  }
}
