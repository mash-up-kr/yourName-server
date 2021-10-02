import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Skill } from 'src/entities/skill.entity';

export class CreateInitialSkillData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Skill)
      .values([
        { id: 1, name: '인싸력' },
        { id: 2, name: '드립력' },
        { id: 3, name: '먹잘알' },
        { id: 4, name: '자기객관화' },
        { id: 5, name: '꼰대력' },
        { id: 6, name: '공감능력' },
      ])
      .execute();
  }
}
