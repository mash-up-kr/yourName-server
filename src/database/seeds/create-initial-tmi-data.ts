import { Tmi } from '../../entities/tmi.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialTmiData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Tmi)
      .values([
        { id: 1, type: '취미 / 관심사', name: '음악' },
        { id: 2, type: '취미 / 관심사', name: '게임' },
        { id: 3, type: '취미 / 관심사', name: '영상' },
        { id: 4, type: '취미 / 관심사', name: '운동' },
        { id: 5, type: '취미 / 관심사', name: '음식' },
        { id: 6, type: '취미 / 관심사', name: '요리' },
        { id: 7, type: '취미 / 관심사', name: '카페' },
        { id: 8, type: '취미 / 관심사', name: '술' },
        { id: 9, type: '취미 / 관심사', name: '자연' },
        { id: 10, type: '취미 / 관심사', name: '야외활동' },
        { id: 11, type: '취미 / 관심사', name: '봉사' },
        { id: 12, type: '취미 / 관심사', name: '여행' },
        { id: 13, type: '취미 / 관심사', name: '동물' },
        { id: 14, type: '취미 / 관심사', name: '기술' },
        { id: 15, type: '취미 / 관심사', name: '공연' },
        { id: 16, type: '취미 / 관심사', name: '덕질' },
        { id: 17, type: '취미 / 관심사', name: '쇼핑' },
        { id: 18, type: '취미 / 관심사', name: '예술' },
        { id: 19, type: '취미 / 관심사', name: '뷰티' },
        { id: 20, type: '취미 / 관심사', name: '패션' },
        { id: 21, type: '취미 / 관심사', name: '인테리어' },
        { id: 22, type: '취미 / 관심사', name: '독서' },
        { id: 23, type: '취미 / 관심사', name: '만화' },
        { id: 24, type: '취미 / 관심사', name: '개그' },
        { id: 25, type: '취미 / 관심사', name: '자동차' },
        { id: 26, type: '취미 / 관심사', name: '외국어' },
        { id: 27, type: '취미 / 관심사', name: '경제' },
        { id: 28, type: '성격', name: '리더쉽' },
        { id: 29, type: '성격', name: '열정' },
        { id: 30, type: '성격', name: '끈기' },
        { id: 31, type: '성격', name: '배려' },
        { id: 32, type: '성격', name: '추진력' },
        { id: 33, type: '성격', name: '자신감' },
        { id: 34, type: '성격', name: '책임감' },
        { id: 35, type: '성격', name: '친화력' },
        { id: 36, type: '성격', name: '발표왕' },
        { id: 37, type: '성격', name: '적응력' },
        { id: 38, type: '성격', name: '꼼꼼함' },
        { id: 39, type: '성격', name: '소통' },
        { id: 40, type: '성격', name: '긍정적' },
        { id: 41, type: '성격', name: '아이디어' },
      ])
      .execute();
  }
}
