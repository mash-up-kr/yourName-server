import { User } from 'src/entities/user.entity';

export interface NameCardSchema {
  id: number;
  name: string;
  role: string;
  personality: string;
  introduce: string;
  uniqueCode: string;
  image: ImageSchema;
  user: User;
  bgColor: BgColorSchema;
  contacts: ContactSchema[];
  tmis: TmiSchema[];
  personalSkills: PersonalSkillSchema[];
}

export interface ImageSchema {
  id: number;
  imgUrl: string;
}

export interface BgColorSchema {
  id: number;
  value: string[];
}

export interface ContactSchema {
  category: string;
  value: string;
  iconUrl: string;
}

export interface TmiSchema {
  type: string;
  name: string;
}

export interface PersonalSkillSchema {
  name: string;
  level: number;
}
