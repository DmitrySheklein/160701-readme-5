import { User } from './user.interface';

export interface AuthUser extends User {
  passwordHash: string;
  publicationsCount?: number;
  subscribersCount?: number;
  subscribers?: string[];
}
