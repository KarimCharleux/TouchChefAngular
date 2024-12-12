import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {Task} from '../dashboard/burger.model';
import {BURGERS} from '../dashboard/burgers.data';
import {WebSocketService} from '../websocket.service';
import {Cook} from '../device.service';
import {ShareDataService} from '../share-data.service';
import {ShareDataServiceDataObject} from '../main-chef-cuisinier/main-page/main-page.component';

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

  receivedObject?: AssignedTask;

  indexOfLastAssignation: number = 0;

  constructor(private shareDataService: ShareDataService, private cdr: ChangeDetectorRef, private wsService: WebSocketService) {
    this.tapSound = new Audio("assets/sounds/tap.mp3");
    this.tasks = BURGERS[0].steps;

    this.shareDataService.data$.subscribe((data) => {
      const d: ShareDataServiceDataObject = data;
      if (d.dataType == 1) {
        if (d.object) {
          const assignedTask: AssignedTask = <AssignedTask>d.object;
          this.receivedObject = assignedTask;
          this.handleReceivedObject(assignedTask);
        }
      }
    });
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

  onDragStart(event: DragEvent, task: Task) {
    if (event.dataTransfer) {
      const inputData: string = "task/" + task.name;
      event.dataTransfer.setData('text/plain', inputData); // Ajoute les données dans le DataTransfer
    }
  }

  handleReceivedObject(assignedTask: AssignedTask) {
    this.addAssignedTask(assignedTask);
  }

  addAssignedTask(assignedTask: AssignedTask): void {
    //this.sendTimerToRightWatch(timer.cook, timer.timerDuration.toString());
    let matchingTask: Task | undefined = this.tasks.find(t => t.name === assignedTask.taskName);
    if (matchingTask) {
      if (matchingTask.assignedCooks) {
        if (matchingTask.nbCooksNeeded == 1) {
          matchingTask.assignedCooks[0] = assignedTask.cook;
        }

        if (matchingTask.nbCooksNeeded == 2) {
          if (this.indexOfLastAssignation == 1 && matchingTask.assignedCooks[0] && matchingTask.assignedCooks[1]) {
            matchingTask.assignedCooks[0] = assignedTask.cook;
            this.indexOfLastAssignation = 0;
          } else if (this.indexOfLastAssignation == 0 && matchingTask.assignedCooks[0] && matchingTask.assignedCooks[1]) {
            matchingTask.assignedCooks[1] = assignedTask.cook;
            this.indexOfLastAssignation = 1;
          } else if (matchingTask.assignedCooks[0]) {
            matchingTask.assignedCooks[1] = assignedTask.cook;
            this.indexOfLastAssignation = 1;
          } else {
            matchingTask.assignedCooks[0] = assignedTask.cook;
            this.indexOfLastAssignation = 0;
          }
        }
      } else {
        matchingTask.assignedCooks = [];
        matchingTask.assignedCooks[0] = assignedTask.cook;
      }


      this.cdr.detectChanges();
    }
  }

  /*async sendTimerToRightWatch(cook: Cook, timerDuration: string) {
    this.wsService.sendMessage({
      from: 'angular',
      to: cook.deviceId,
      type: 'addTimer',
      timer: {timerId: this.id.toString(), timerDuration: timerDuration}
    });
  }*/
  protected readonly Array = Array;
}

export interface AssignedTask {
  taskName: string;
  cook: Cook;
}
