/* eslint-disable no-unused-vars */

import {
  ResumeStep1Schema,
  ResumeStep2Schema,
  ResumeStep3Schema,
  ResumeStep4Schema,
  ResumeStep5Schema,
} from "@/lib/resumeSchema";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/utils";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

declare type CandidateLayoutProps = {
  children: React.ReactNode;
};

declare type signInProps = {
  email: string;
  password: string;
};

declare type CreateCandidateProfileProps = {
  email: string;
  password?: string;
  full_name?: string;
  university?: string;
  course?: string;
  role: 'candidate' | 'admin' | 'staff';
}

interface Profile {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  preferred_call_name: string;
  previous_first_name: string | null;
  previous_last_name: string | null;
  gender: string;
  birth_date: string | null;
  city_of_birth: string;
  state_of_birth: string;
  country_of_birth: string;
  phone_number: string;
  country_current_reside: string;
  state_current_reside: string;
  city_current_reside: string;
  current_house_address: string;
  postal_code: string;
  bio: string;
  user: number;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface CandidateData {
  serialNumber: number;
  full_name: string;
  country: string;
  university: string;
  course: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
  assigned: boolean;
}

declare type UserType = {
  id: number;
  email: string;
  role: "candidate" | "staff" | "admin";
  profile: Profile;
}

declare type LoginUser = {
  email: string;
  password: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type OptionType = {
  value: string;
  label: string;
}

interface User {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    token?: string; // Add token property
  };
  isLoggedIn?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<UserContextValue["user"]>>; // Function to update user state
}

declare type DottedBoxProps = {
  docType: string;
  icon: string;
  href: string; // Optional onClick function
  className: string;
};

declare type SmallBoxProps = {
  name: string;
  icon: string;
  number: number; // Optional onClick function
};

declare type NotificationProps = {
  title: string;
  icon: string;
  text: string;
  date: string;
};

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface SiderbarProps {
  user: User;
}

declare interface ResumeFormData {
  city: string;
  companyDescription: string;
  coreSkills: string;
  country: string;
  course: string;
  dateOfBirth: string;
  email: string;
  endDate: string;
  fullName: string;
  gender: string;
  interest: string;
  jobTitle: string;
  kindOfDegree: string;
  location: string;
  mode: string;
  nameOfCompany: string;
  nationality: string;
  phoneNumber: string;
  profession: string;
  prompt: string;
  startDate: string;
  state: string;
  tertiaryInstitutionAttended: string;
  typeOfCompany: string;
}

// validationSchemas.ts
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
// Define types for other steps similarly
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;

export type FormData = Step1FormData &
  Step2FormData &
  Step3FormData &
  Step4FormData &
  Step5FormData;

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  email: string;
  serialNumber: number;
  name: string;
  recommendedSchool: string;
  recommendedCourse: string;
  resume: string;
  sop: string;
  schoolApplicationStarted: string;
  schoolApplicationCompleted: string;
  status: string;
  phone: string;
};

declare interface AllCandidates {
  full_name: string;
  university: string;
  course: string;
  sopStatus?: string;
  resumeStatus?: string;
  schoolApplicationStatus?: string;
  assigned: boolean;
  duplicate?: string;
  // Add missing fields
  serialNumber?: number; // Add serial number dynamically
  country?: string;
}


declare interface AllCandidatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllCandidates[];
}

export type AllColumn = {
  id: string;
  serialNumber: number;
  candidateName: string;
  country: string;
  assignedCourse: string;
  assignedUniversity: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
};

export type TeamMemberColumn = {
  id: string;
  fullName: string;
  staffStatus: string;
  assignedCandidates: string;
  permission: string;
  deleteAccount: string;
};

// ResumevalidationSchemas.ts
export type ResumeStep1FormData = z.infer<typeof ResumeStep1Schema>;
export type ResumeStep2FormData = z.infer<typeof ResumeStep2Schema>;
export type ResumeStep3FormData = z.infer<typeof ResumeStep3Schema>;
export type ResumeStep4FormData = z.infer<typeof ResumeStep4Schema>;
export type ResumeStep5FormData = z.infer<typeof ResumeStep5Schema>;
