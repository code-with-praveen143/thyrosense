
export interface Lifestyle {
  smoking_habit: string;
  alcohol_consumption: string;
  exercise_routine: string;
  dietary_habits: string;
  sleep_pattern: string;
  work_environment: string;
  _id: string;
}

export interface DeviceDetails {
  _id: string;
}

export interface User {
  _id: string;
  alpha: string;
  username: string;
  password: string;
  email: string;
  role: string; // Possible values: "user", "admin", etc.
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  blood_type?: string; // Optional
  device_details?: DeviceDetails; // Optional
  dob?: string; // Optional, ISO date string
  height?: number; // Optional
  lifestyle?: Lifestyle; // Optional
  marital_status?: string; // Optional
  weight?: number; // Optional
  isLogin: boolean;
}