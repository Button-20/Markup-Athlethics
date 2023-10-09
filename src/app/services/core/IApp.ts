export interface User {
  country: string;
  email: string;
  email_verified_at: boolean;
  id: number;
  institution_name: string;
  name: string;
  phone: string;
  slug: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  user_type: string;
}

export interface Student {
  id: number;
  user_type: string;
  user_id: number;
  profile_picture: string;
  nationality: string;
  date_of_birth: string;
  height: string;
  weight: string;
  educational_level: string;
  interests: Array<string>;
  featured: number;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface Sports {
  id: number;
  sport_name: string;
  positions: Positions[];
  created_at: Date;
  updated_at: Date;
}

export interface Positions {
  id: number;
  position_name: string;
  sport_id: number;
  skills: Skills[];
}

export interface Skills {
  id: number;
  position_id: number;
  skill_title: string;
  skills: string[];
}

export interface News {
  id: number;
  body: string;
  imagePath: string;
  slug: string;
  tag: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface Faqs {
  id: number;
  question: string;
  answer: string;
}

export interface Education{
  
}