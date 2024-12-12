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
  name: string;
  subTasks: SubTask[];
  nbCooksNeeded: number;
  assignedCooks?: Cook[];
}

export interface Burger {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: Task[];
}
