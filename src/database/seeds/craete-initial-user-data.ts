import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../entities/user.entity';

export class CreateInitialUserData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 1, nickName: '거뇌', providerName: 'Apple' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 2, nickName: 'u2', providerName: 'Kakao' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 3, nickName: 'u3', providerName: 'Apple' }])
      .execute();
  }
}
