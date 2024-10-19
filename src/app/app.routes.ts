import { Routes } from '@angular/router';
import {HomeMenuComponent} from './home-menu/home-menu.component';
import {TaskComponent} from './list-tasks/task/task.component';

export const routes: Routes = [
  {
    path: '', component: TaskComponent
  }
];
