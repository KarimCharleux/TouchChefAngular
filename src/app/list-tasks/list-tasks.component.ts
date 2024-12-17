import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {Task} from '../dashboard/burger.model';
import {TaskService} from '../task.service';
import {Cook} from '../device.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [NgForOf, NgIf, DialogModule],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent {

  showDialog: boolean = false;
  selectedTask: Task | null = null;
  tapSound: HTMLAudioElement;
  progress: number = 0;

  constructor(
    protected taskService: TaskService,
  ) {
    this.tapSound = new Audio("assets/sounds/confirm.mp3");
  }

  toggleCheck(index: number, event: Event) {
    this.tapSound.play().then();
    event.stopPropagation();
    
    const task = this.taskService.getCurrentTasks()[index];
    if (task.isCompleted) {
      this.taskService.unCompleteTask(task.id);
    } else {
      this.taskService.completeTask(task.id);
    }

    this.progress = Math.round((this.taskService.getCurrentTasks().filter(t => t.isCompleted).length / this.taskService.getCurrentTasks().length) * 100);
  }

  showTaskDetails(task: Task) {
    if (task.subTasks && task.subTasks.length > 0) {
      this.selectedTask = task;
      this.showDialog = true;
    }
  }

  onDragStart(event: DragEvent, task: Task) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', "task/" + task.id);
    }
  }

  protected readonly Array = Array;
  protected readonly Math = Math;

  getTimerOffset(duration: number): number {
    const circumference = 2 * Math.PI * 18;
    const progress = duration / 60; // Calcul du pourcentage par rapport à 60 secondes
    return circumference * (1 - progress);
  }

  unassignCook(cook: Cook): void {
    if (this.selectedTask) {
      this.taskService.unAssignTask(this.selectedTask.id, cook);
      this.tapSound.play().then();
    }
  }
}
