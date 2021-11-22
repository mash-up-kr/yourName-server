import { User } from 'src/entities/user.entity';

export interface CollectionSchame {
  id: number;
  name: string;
  description: string;
  bgColor: BgColorSchema;
}

export interface NameCardSchema {
  id: number;
  name: string;
  role: string;
  personality: string;
  introduce: string;
  uniqueCode: string;
  imageId: number;
  user: User;
  bgColor: BgColorSchema;
  contact: ContactSchema[];
  tmi: TmiSchema[];
  personalSkill: PersonalSkillSchema[];
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
