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
        {
          id: 1,
          type: '취미 / 관심사',
          name: '음악',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_music.png',
        },
        {
          id: 2,
          type: '취미 / 관심사',
          name: '게임',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_game.png',
        },
        {
          id: 4,
          type: '취미 / 관심사',
          name: '운동',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_exercise.png',
        },
        {
          id: 3,
          type: '취미 / 관심사',
          name: '영상',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_video.png',
        },
        {
          id: 5,
          type: '취미 / 관심사',
          name: '음식',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_food.png',
        },
        {
          id: 6,
          type: '취미 / 관심사',
          name: '요리',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_cook.png',
        },
        {
          id: 7,
          type: '취미 / 관심사',
          name: '카페',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_cafe.png',
        },
        {
          id: 8,
          type: '취미 / 관심사',
          name: '술',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_alcohol.png',
        },
        {
          id: 9,
          type: '취미 / 관심사',
          name: '자연',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_nature.png',
        },
        {
          id: 10,
          type: '취미 / 관심사',
          name: '야외활동',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_outdoor.png',
        },
        {
          id: 11,
          type: '취미 / 관심사',
          name: '봉사',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_volunteer.png',
        },
        {
          id: 12,
          type: '취미 / 관심사',
          name: '여행',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_travel.png',
        },
        {
          id: 13,
          type: '취미 / 관심사',
          name: '동물',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_animal.png',
        },
        {
          id: 14,
          type: '취미 / 관심사',
          name: '기술',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_tech.png',
        },
        {
          id: 15,
          type: '취미 / 관심사',
          name: '공연',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_show.png',
        },
        {
          id: 16,
          type: '취미 / 관심사',
          name: '덕질',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_idol.png',
        },
        {
          id: 17,
          type: '취미 / 관심사',
          name: '쇼핑',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_shopping.png',
        },
        {
          id: 18,
          type: '취미 / 관심사',
          name: '예술',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_art.png',
        },
        {
          id: 19,
          type: '취미 / 관심사',
          name: '뷰티',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_beauty.png',
        },
        {
          id: 20,
          type: '취미 / 관심사',
          name: '패션',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_fashion.png',
        },
        {
          id: 21,
          type: '취미 / 관심사',
          name: '인테리어',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_interior.png',
        },
        {
          id: 22,
          type: '취미 / 관심사',
          name: '독서',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_reading.png',
        },
        {
          id: 23,
          type: '취미 / 관심사',
          name: '만화',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_cartoon.png',
        },
        {
          id: 24,
          type: '취미 / 관심사',
          name: '개그',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_comedy.png',
        },
        {
          id: 25,
          type: '취미 / 관심사',
          name: '자동차',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_car.png',
        },
        {
          id: 26,
          type: '취미 / 관심사',
          name: '외국어',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_language.png',
        },
        {
          id: 27,
          type: '취미 / 관심사',
          name: '경제',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_economy.png',
        },
        {
          id: 28,
          type: '성격',
          name: '리더쉽',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_leadrship.png',
        },
        {
          id: 29,
          type: '성격',
          name: '열정',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_passion.png',
        },
        {
          id: 30,
          type: '성격',
          name: '끈기',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_patience.png',
        },
        {
          id: 31,
          type: '성격',
          name: '배려',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_consideration.png',
        },
        {
          id: 32,
          type: '성격',
          name: '추진력',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_drive.png',
        },
        {
          id: 33,
          type: '성격',
          name: '자신감',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_confidence.png',
        },
        {
          id: 34,
          type: '성격',
          name: '책임감',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_.responsibility.png',
        },
        {
          id: 35,
          type: '성격',
          name: '친화력',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_sociability.png',
        },
        {
          id: 36,
          type: '성격',
          name: '발표왕',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_.presentation.png',
        },
        {
          id: 37,
          type: '성격',
          name: '적응력',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_.adaptability.png',
        },
        {
          id: 38,
          type: '성격',
          name: '꼼꼼함',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_detailed.png',
        },
        {
          id: 39,
          type: '성격',
          name: '소통',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_communication.png',
        },
        {
          id: 40,
          type: '성격',
          name: '긍정적',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_positive.png',
        },
        {
          id: 41,
          type: '성격',
          name: '아이디어',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/tmi/tmi_idea.png',
        },
      ])
      .execute();
  }
}
