import {Cook} from '../device.service';

export interface Ingredient {
  name: string;
  imageUrl: string;
}

export interface SubTask {
  order: number;
  description: string;
}

export interface Task {
  id: string;
  name: string;
  icons: string;
  subTasks: SubTask[];
  nbCooksNeeded: number;
  assignedCooks: Cook[];
  duration?: number; // In seconds
  workStation?: 'evier' | 'planche' | 'grill';
  quantity: number; // Le nombre de fois que la tâche doit être faite
  isCompleted: boolean;
}

export interface Burger {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  tasks: Task[];
}
