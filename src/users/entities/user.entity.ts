import { User as PrismaUser, UserRole } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role: UserRole;
  skills: string[];
  resumeUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
