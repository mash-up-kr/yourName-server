import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user.entity';
import { userOnboardingType } from 'src/types/onBoarding.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './users.docs';
import { UsersService } from './users.service';

@ApiTags('User 유저 관련')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @Todo
   * - 온보딩 목록 및 완려 여부
   * - 온보딩 완료하기
   * - 쓸 수 있는 색깔
   */
  @ApiDocs.getUserOnboardings('온보딩 목록 및 달성 여부 가져오기')
  @Get('/onboarding')
  async getUserOnboardings(@AuthUser() user: User) {
    return await this.usersService.getUserOnboardings(user.id);
  }

  @ApiDocs.doneUserOnboarding('온보딩 퀘스트 완료하기')
  @Put('/onboarding/:type/done')
  async doneUserOnboarding(
    @AuthUser() user: User,
    @Param('type') onboardingType: userOnboardingType,
  ) {
    await this.usersService.doneUserOnboarding(user.id, onboardingType);
  }

  @ApiDocs.doneWaitUserOnboarding('온보딩 퀘스트 완료 대기 상태로 변경')
  @Put('/onboarding/:type/done-wait')
  async doneWaitUserOnboarding(
    @AuthUser() user: User,
    @Param('type') onboardingType: userOnboardingType,
  ) {
    await this.usersService.doneWaitUserOnboarding(user.id, onboardingType);
  }

  @ApiDocs.getBgColors('유저가 사용한 컬러 조회')
  @Get('/bgcolors')
  async getBgColors(@AuthUser() user: User) {
    return await this.usersService.getBgColors(user.id);
  }
}
