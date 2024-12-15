import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {Task} from '../dashboard/burger.model';
import {BURGERS} from '../dashboard/burgers.data';
import {WebSocketService} from '../websocket.service';
import {Cook} from '../device.service';
import {ShareDataService} from '../share-data.service';
import {ShareDataServiceDataObject} from '../main-chef-cuisinier/main-page/main-page.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, DialogModule],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  @Input() tasks: Task[] = [];
  @Output() progressChange = new EventEmitter<number>();

  private progressSubscription: Subscription | null = null;

  checkedTasks: Set<number> = new Set();
  showDialog: boolean = false;
  selectedTask: Task | null = null;
  tapSound: HTMLAudioElement;

  receivedObject?: AssignedTask;

  indexOfLastAssignation: number = 0;

  constructor(private shareDataService: ShareDataService, private cdr: ChangeDetectorRef, private wsService: WebSocketService) {
    this.tapSound = new Audio("assets/sounds/confirm.mp3");
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

  ngOnInit() {
    this.setupTaskProgressTracking();
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
    if (task.subTasks && task.subTasks.length > 0) {
      this.selectedTask = task;
      this.showDialog = true;
    }
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
      this.manageTask(assignedTask);
      this.cdr.detectChanges();
    }
  }


  async manageTask(assignedTask: AssignedTask) {

    this.sendTaskToRightWatch(assignedTask);

  }

  async sendTaskToRightWatch(assignedTask: AssignedTask) {
    this.wsService.sendMessage({
      from: 'angular',
      to: assignedTask.cook.deviceId,
      type: 'addTask',
      assignedTask: assignedTask
    });
  }

  protected readonly Array = Array;
  protected readonly Math = Math;

  getTimerOffset(duration: number): number {
    const circumference = 2 * Math.PI * 18;
    const progress = duration / 60; // Calcul du pourcentage par rapport à 60 secondes
    return circumference * (1 - progress);
  }

  setupTaskProgressTracking() {
    // Pour chaque tâche, configurez le suivi de progression
    this.tasks.forEach(task => {
      //if (task.assignedCooks && task.assignedCooks.length > 0) {
      //const playerID = task.assignedCooks[0].deviceId;
      //const taskName = task.name;

      let msg: string = "";

      this.progressSubscription = this.wsService
        .waitMessage(msg)
        .subscribe(message => {
          const taskProgressMessage = message as {
            type: string,
            from: string,
            to: string,
            progressData: ProgressData
          };
          if (taskProgressMessage.type === "taskProgress") {
            const progressData: ProgressData = taskProgressMessage.progressData;
            this.updateTaskProgress(progressData);
          }
        });
      // }
    });
  }

  updateTaskProgress(progressData: ProgressData) {
    // Logique pour mettre à jour la progression de la tâche
    if (progressData.currentProgress === progressData.targetProgress) {
      // Tâche terminée
      const index = this.tasks.findIndex(t => t.name === progressData.taskName);
      this.checkedTasks.add(index);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    // Nettoyez l'abonnement lors de la destruction du composant
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }
}

export interface AssignedTask {
  taskName: string;
  cook: Cook;
}

export interface ProgressData {
  taskName: string;
  playerId: string;
  currentProgress: number;
  targetProgress: number;
}
