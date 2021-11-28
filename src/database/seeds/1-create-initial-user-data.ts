import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../entities/user.entity';

export class CreateInitialUserData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 1, userIdentifier: '5235134526', providerName: 'Apple' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 2,
          userIdentifier: '000612.374a47cb915b4139940a82e3fdaa20ec.0885',
          providerName: 'Kakao',
        },
      ])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 3, userIdentifier: '123123123', providerName: 'Apple' }])
      .execute();
  }
}
