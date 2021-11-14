import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './users.docs';
import { UsersService } from './users.service';

@ApiTags('User 유저 관련')
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
  @Get(':id/onboarding')
  async getUserOnboardings(@Param('id') userId: number) {
    return await this.usersService.getUserOnboardings(userId);
  }

  @ApiDocs.doneUserOnboarding('온보딩 퀘스트 완료하기')
  @Put(':id/onboarding/:type/done')
  async doneUserOnboarding(
    @Param('id') userId: number,
    @Param('type') onboardingType: string,
  ) {
    await this.usersService.doneUserOnboarding(userId, onboardingType);
  }

  @ApiDocs.doneWaitUserOnboarding('온보딩 퀘스트 완료 대기 상태로 변경')
  @Put(':id/onboarding/:type/done-wait')
  async doneWaitUserOnboarding(
    @Param('id') userId: number,
    @Param('type') onboardingType: string,
  ) {
    await this.usersService.doneWaitUserOnboarding(userId, onboardingType);
  }

  @ApiDocs.getBgColors('유저가 사용한 컬러 조회')
  @Get(':id/bgcolors')
  async getBgColors(@Param('id') userId: number) {
    return await this.usersService.getBgColors(userId);
  }
}
