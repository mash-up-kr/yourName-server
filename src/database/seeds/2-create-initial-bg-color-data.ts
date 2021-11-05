import { BgColor } from '../../entities/bg-color.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
export class CreateInitialBgColorData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BgColor)
      .values([
        {
          id: 1,
          color1: '#D6BFFF',
        },
        {
          id: 2,
          color1: '#FFCBFD',
        },
        {
          id: 3,
          color1: '#FFB9AA',
        },
        {
          id: 4,
          color1: '#FFF197',
        },
        {
          id: 5,
          color1: '#CFFDBA',
        },
        {
          id: 6,
          color1: '#B4ECFE',
        },
        {
          id: 7,
          color1: '#B4ECFE',
          color2: '#CFFDBA',
          userOnboardingField: 'makeFirstNameCard',
        },
      ])
      .execute();
  }
}
