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
          color1: '#CAADFF',
          color2: '#B4ECFE',
          userOnboardingField: 'makeFirstNameCard',
        },
        // {
        //   id: 8,
        //   color1: '#A6E9FF',
        //   color2: '#CFFDBA',
        //   userOnboardingField: 'shareMyNameCard',
        // },
        {
          id: 9,
          color1: '#FFF3A6',
          color2: '#CFFDBA',
          color3: '#B4ECFE',
          color4: '#FFCBFD',
          userOnboardingField: 'addFriendNameCard',
        },
        {
          id: 10,
          color1: '#FFC5C5',
          color2: '#FFF199',
          color3: '#BFFFA1',
          userOnboardingField: 'makeNewCollection',
        },
        {
          id: 11,
          color1: '#DDB3FF',
          color2: '#FFD1F5',
          color3: '#FFCFCF',
          color4: '#FFF4AB',
          color5: '#D9FFC8',
          userOnboardingField: 'makeThreeNameCards',
        },
      ])
      .execute();
  }
}
