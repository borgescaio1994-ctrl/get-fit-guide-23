export interface UserProfile {
  goal: string;
  sex: string;
  age: number;
  weight: number;
  height: number;
  experience: string;
  frequency: number;
  dietaryRestrictions: string[];
  injuries: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  gifUrl: string;
  tips: string;
}

export interface WorkoutDay {
  day: string;
  muscleGroup: string;
  exercises: Exercise[];
}

export interface Meal {
  name: string;
  time: string;
  foods: { item: string; quantity: string; calories: number }[];
  totalCalories: number;
  macros: { protein: number; carbs: number; fat: number };
}

export interface FitnessPlan {
  workout: WorkoutDay[];
  diet: Meal[];
  totalDailyCalories: number;
}
