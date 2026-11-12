export type UserRole = 'student' | 'teacher';
export type SSOProvider = 'google' | 'clever';

export interface SchoolUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: SSOProvider;
  schoolName: string;
  districtName: string;
  avatarUrl?: string;
  gradeOrSubject: string;
  studentId?: string;
  teacherCode?: string;
  cleverBadgeId?: string;
  savedQuizzesCount?: number;
}
