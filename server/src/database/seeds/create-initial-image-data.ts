import { Image } from '../../entities/image.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialImageData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values([
        { id: 1, key: 'testurl' },
        { id: 2, key: 'testurl2' },
      ])
      .execute();
  }
}
