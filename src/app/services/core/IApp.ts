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
  institution_id: string;
  user_progress: {
    id: number;
    user_id: number;
    videos_completed: number;
    images_completed: number;
    personal_data_completed: number;
    athletic_background_completed: number;
    educational_background_completed: number;
    created_at: Date;
    updated_at: Date;
  };
  preferences: [
    { all_notifications: boolean },
    { profile_visits: boolean },
    { connection_requests: boolean }
  ];
}

export interface Student {
  id: number;
  user_type: string;
  user_id: number;
  profile_picture: string;
  nationality: string;
  name: string;
  date_of_birth: string;
  height: string;
  weight: string;
  educational_level: string;
  interests: Array<string>;
  featured: number;
  phone: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  institution_name: string;
  educational_backgrounds: {
    id: number;
    course_of_study: string;
    gpa: number;
    graduation_year: number;
    extra_curricular_activities: string[];
    academic_achievement: null;
    transcript_path: null;
    user_id: number;
  };
  students: {
    id: number;
    user_id: number;
    profile_picture: string;
    nationality: string;
    gender: string;
    date_of_birth: string;
    height: string;
    weight: string;
    educational_level: string;
    interests: string[];
    featured: number;
  };
  athletic_backgrounds: {
    id: number;
    sports: string[];
    athletic_achievements: string;
    references: { id: number; name: string; email: string }[];
    letters_of_recommendation: [];
    skills: {
      soccer_skill_level: string;
      soccer_position_played: {
        id: number;
        position_name: string;
        sport_id: number;
        skills: {
          id: number;
          position_id: number;
          skill_title: string;
          skills: string[];
        }[];
      };
      soccer_ball_control: string;
      soccer_agility: string;
      soccer_speed: string;
      soccer_accuracy: string;
      soccer_power: string;
      soccer_finesse: string;
      track_and_field_skill_level: string;
      track_and_field_position_played: {
        id: number;
        position_name: string;
        sport_id: number;
        skills: [];
      };
    };
    user_id: number;
  };
  images: {
    id: number;
    image_path: string;
    user_id: number;
  }[];
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

export interface Education {
  id: number;
  course_of_study: string;
  gpa: number;
  graduation_year: number;
  extra_curricular_activities: Array<string>;
  academic_achievement: string;
  transcript_path: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface INotification {
  id: number;
  athlete_id: number;
  title: string;
  coach_id: number;
  message: string;
  read_at: string;
  created_at: Date;
  updated_at: Date;
}
