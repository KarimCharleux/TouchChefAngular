import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {TaskComponent} from './task/task.component';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    NgForOf,
    TaskComponent
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  $nbTasks: number = 4;

}
