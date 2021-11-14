import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserOnboarding } from '../../entities/user-onboarding.entity';
export class CreateInitialUserOnboardingData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserOnboarding)
      .values([
        {
          id: 1,
          userId: 1,
        },
        {
          id: 2,
          userId: 2,
        },
        {
          id: 3,
          userId: 3,
        },
      ])
      .execute();
  }
}
