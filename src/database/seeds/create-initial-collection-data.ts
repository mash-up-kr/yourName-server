import { Collection } from '../../entities/collection.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialCollectionData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 1, name: '전체 미츄', userId: 1 }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 2, name: '매시업 노드팀', userId: 2 }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([{ id: 3, name: '너의 이름은팀', userId: 3 }])
      .execute();
  }
}
