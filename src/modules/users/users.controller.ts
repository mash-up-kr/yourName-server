import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './users.docs';
import { UsersService } from './users.service';

@ApiTags('User Onboarding - 온보딩')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @Todo
   * - 온보딩 목록 및 완려 여부
   * - 온보딩 완료하기
   * - 쓸 수 있는 색깔
   */
  @ApiDocs.getOnboarding('온보딩 목록 및 달성 여부 가져오기')
  @Get(':id/onboarding')
  async getOnboarding(@Param('id') userId: number) {
    return await this.usersService.getOnboarding(userId);
  }
}
