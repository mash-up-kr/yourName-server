import { Collection } from '../../entities/collection.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialCollectionData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 1, userId: 1 }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 2, userId: 2 }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 3, userId: 3 }])
      .execute();
  }
}
