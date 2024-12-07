import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Task } from '../dashboard/burger.model';
import { BURGERS } from '../dashboard/burgers.data';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, DialogModule],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent {
  @Input() tasks: Task[] = [];
  @Output() progressChange = new EventEmitter<number>();

  checkedTasks: Set<number> = new Set();
  showDialog: boolean = false;
  selectedTask: Task | null = null;
  tapSound: HTMLAudioElement;

  constructor(){
    this.tapSound = new Audio("assets/sounds/tap.mp3");
    this.tasks = BURGERS[0].steps;
  }

  toggleCheck(index: number, event: Event) {
    this.tapSound.play().then();
    event.stopPropagation(); // Empêche l'ouverture du dialogue
    if (this.checkedTasks.has(index)) {
      this.checkedTasks.delete(index);
    } else {
      this.checkedTasks.add(index);
    }

    const progress = (this.checkedTasks.size / this.tasks.length) * 100;
    this.progressChange.emit(Math.round(progress));
  }

  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.showDialog = true;
  }
}
