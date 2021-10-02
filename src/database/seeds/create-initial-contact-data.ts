import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Contact } from '../../entities/contact.entity';
export class CreateInitialContactData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          id: 1,
          category: 'Phone.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Phone+Number.png',
        },
        {
          id: 2,
          category: 'Email.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Email.png',
        },
        {
          id: 3,
          category: 'Instagram.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Instagram.png',
        },
        {
          id: 4,
          category: 'Facebook.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Facebook.png',
        },
        {
          id: 5,
          category: 'Youtube.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Youtube.png',
        },
        {
          id: 6,
          category: 'Blog.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Blog.png',
        },
        {
          id: 7,
          category: 'Website.',
          iconUrl:
            'https://erme.s3.ap-northeast-2.amazonaws.com/contact_icon/Website.png',
        },
      ])
      .execute();
  }
}
