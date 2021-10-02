import { Tmi } from '../../entities/tmi.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialTmiData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 1, type: '취미 / 관심사', name: '음악' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 2, type: '취미 / 관심사', name: '게임' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 3, type: '취미 / 관심사', name: '영상' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 4, type: '취미 / 관심사', name: '운동' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 5, type: '취미 / 관심사', name: '음식' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 6, type: '취미 / 관심사', name: '요리' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 7, type: '취미 / 관심사', name: '카페' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 8, type: '취미 / 관심사', name: '술' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 9, type: '취미 / 관심사', name: '자연' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 10, type: '취미 / 관심사', name: '야외활동' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 11, type: '취미 / 관심사', name: '봉사' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 12, type: '취미 / 관심사', name: '여행' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 13, type: '취미 / 관심사', name: '동물' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 14, type: '취미 / 관심사', name: '기술' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 15, type: '취미 / 관심사', name: '공연' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 16, type: '취미 / 관심사', name: '덕질' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 17, type: '취미 / 관심사', name: '쇼핑' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 18, type: '취미 / 관심사', name: '예술' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 19, type: '취미 / 관심사', name: '뷰티' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 20, type: '취미 / 관심사', name: '패션' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 21, type: '취미 / 관심사', name: '인테리어' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 22, type: '취미 / 관심사', name: '독서' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 23, type: '취미 / 관심사', name: '만화' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 24, type: '취미 / 관심사', name: '개그' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 25, type: '취미 / 관심사', name: '자동차' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 26, type: '취미 / 관심사', name: '외국어' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 27, type: '취미 / 관심사', name: '경제' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 28, type: '성격', name: '리더쉽' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 29, type: '성격', name: '열정' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 30, type: '성격', name: '끈기' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 31, type: '성격', name: '배려' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 32, type: '성격', name: '추진력' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 33, type: '성격', name: '자신감' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 34, type: '성격', name: '책임감' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 35, type: '성격', name: '친화력' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 36, type: '성격', name: '발표왕' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 37, type: '성격', name: '적응력' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 38, type: '성격', name: '꼼꼼함' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 39, type: '성격', name: '소통' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 40, type: '성격', name: '긍정적' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([{ id: 41, type: '성격', name: '아이디어' }])
      .execute();
  }
}
