import { User } from 'src/entities/user.entity';

export interface NameCardSchema {
  id: number;
  name: string;
  role: string;
  personality: string;
  introduce: string;
  uniqueCode: string;
  imgUrl: string;
  user: User;
  bgColor: BgColorSchema;
  contacts: ContactSchema[];
  tmis: TmiSchema[];
  personalSkills: PersonalSkillSchema[];
}

export interface ParticularNameCardSchema {
  nameCard: NameCardSchema;
  isAdded: boolean;
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
  iconUrl: string;
}

export interface PersonalSkillSchema {
  name: string;
  level: number;
}
