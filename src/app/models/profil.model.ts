import { Achievement } from "./achievements.component";

export interface Profile {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    phoneNumber: string;
    achievements: Achievement[];
  }
  