export interface User {
  country: string;
  created_at: Date;
  email: string;
  email_verified_at: boolean;
  id: number;
  institution_name: string;
  name: string;
  phone: string;
  slug: string;
  status: string;
  updated_at: Date;
  user_type: string;
}

export interface Sports{
  id: number;
  sport_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface SportsPositions{
  id: number;
  sport_id: number;
  position_name: string;
  created_at: Date;
  updated_at: Date;
}
