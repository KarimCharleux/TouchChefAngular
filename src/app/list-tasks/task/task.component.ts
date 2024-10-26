import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  $taskToDo: string = "Pâte à pizza";
  $isTaskChecked: boolean = false;

}
