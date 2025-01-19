import {ChangeDetectorRef, Component, Injectable, OnDestroy} from '@angular/core';
import {Cook} from '../device.service';
import {Task} from '../dashboard/burger.model';
import {BURGERS} from '../dashboard/burgers.data';
import {ProgressData, TaskFinishedMessage, TaskWebSocketService} from './task-websocket.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  template: `

  `,
  standalone: true
})
export class TaskService implements OnDestroy {
  private currentTasks: Task[];
  private indexOfLastAssignation: number = 0;
  private subscriptionsProgressTasks: Subscription = new Subscription();
  private subscriptionsFinishedTasks: Subscription = new Subscription();


  constructor(
    private taskWsService: TaskWebSocketService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.currentTasks = BURGERS[0].tasks; // TODO: change to current burger
    this.changeBurger(0); // TODO: change to current burger
    this.taskWsService.waitUnactiveTaskMessage(this.unassignTaskReceived.bind(this));
    this.setupTaskFinishTracking();
    this.setupTaskProgressTracking();
  }

  getCurrentTasks(): Task[] {
    return this.currentTasks;
  }

  getTaskById(taskId: string): Task | undefined {
    return this.currentTasks.find(t => t.id === taskId);
  }

  /**
   * Assign a task to a cook by sending a message to the websocket server
   * If the task is already assigned to the cook, do nothing
   * If the task is already assigned to a cook, replace the cook with the new cook
   * If the task is already assigned to the maximum number of cooks, replace the next cook in the list with the new cook
   * If the task is not assigned to a cook, assign it to the cook
   *
   * @param taskId - The id of the task to assign
   * @param cook - The cook to assign the task to
   */
  assignTask(taskId: string, cook: Cook): void {
    const task = this.currentTasks.find(t => t.id === taskId);
    if (task && task.assignedCooks) { // Check if the task exists and has assigned cooks
      if (task.assignedCooks.length > 0) {
        this.unAssignTask(taskId, task.assignedCooks[0]);
      }
      if (!task.assignedCooks.find(c => c.deviceId === cook.deviceId)) { // Check if the cook is not already assigned to the task
        if (task.assignedCooks.length < task.nbCooksNeeded) { // Check if the task has less cooks assigned than needed
          task.assignedCooks.push(cook); // Assign the cook to the task
        } else {
          // Replace the next cook in the list with the new cook
          task.assignedCooks[this.indexOfLastAssignation] = cook;
          this.indexOfLastAssignation++;
          if (this.indexOfLastAssignation >= task.nbCooksNeeded) {
            this.indexOfLastAssignation = 0;
          }
        }
        this.taskWsService.sendTask(task, cook);
      } else {
        console.error("Impossible d'assigner la tâche à " + cook.name + " car il est déjà assigné à cette tâche. TaskId : " + taskId);
      }
      this.cdr.detectChanges();
    } else {
      console.error("Impossible d'assigner la tâche à " + cook.name + " car la tâche n'existe pas. TaskId : " + taskId);
    }
  }

  unAssignTask(taskId: string, cook: Cook): void {
    const task = this.currentTasks.find(t => t.id === taskId);
    if (task && task.assignedCooks) {
      const index = task.assignedCooks.findIndex(c => c.deviceId === cook.deviceId);
      this.taskWsService.unactiveTask(task);
      if (index !== -1) {
        task.assignedCooks.splice(index, 1);
        this.cdr.detectChanges();
      }
    }
  }

  unassignTaskReceived(taskId: string, deviceId: string): void {
    const task = this.currentTasks.find(t => t.id === taskId);
    if (task && task.assignedCooks) {
      const index = task.assignedCooks.findIndex(c => c.deviceId === deviceId);
      if (index !== -1) {
        task.assignedCooks.splice(index, 1);
        this.cdr.detectChanges();
      }
    }
  }

  getNumberOfAssignedUncompletedTasksOfCook(cook: Cook): number {
    return this.currentTasks.filter(t => !t.isCompleted && t.assignedCooks?.some(c => c.deviceId === cook.deviceId)).length;
  }

  numberOfCookTasks(cook: Cook): number {
    return this.currentTasks.filter(t => t.assignedCooks?.some(c => c.deviceId === cook.deviceId)).length;
  }

  getTasksByCook(cook: Cook): Task[] {
    return this.currentTasks.filter(t => t.assignedCooks?.some(c => c.deviceId === cook.deviceId));
  }

  changeBurger(burgerId: number): void {
    this.currentTasks = BURGERS[burgerId].tasks;
    this.taskWsService.sendRecipeItemsToTable(BURGERS[burgerId].recipeItems);
  }

  updateTaskProgress(obj: ProgressData | TaskFinishedMessage) {
    if ('currentProgress' in obj && 'targetProgress' in obj) {
      this.updateTaskProgressData(obj as ProgressData);
    } else {
      this.updateTaskFinished(obj as TaskFinishedMessage);
    }
  }

  private updateTaskProgressData(obj: ProgressData) {
    if (obj.currentProgress === obj.targetProgress) {
      const task = this.currentTasks.find(t => t.id === obj.taskId);
      if (task) {
        task.isCompleted = true;
        this.taskWsService.unactiveTaskOnTable(task, obj.playerId);
        this.taskWsService.unactiveTaskOnWatch(task, obj.playerId);
      }
    }
  }

  private updateTaskFinished(obj: TaskFinishedMessage) {
    const task = this.currentTasks.find(t => t.id === obj.assignedTask.taskId);
    if (task) {
      task.isCompleted = true;
      this.taskWsService.unactiveTaskOnTable(task, obj.assignedTask.cook.deviceId);
      this.taskWsService.unactiveTaskOnWatch(task, obj.assignedTask.cook.deviceId);
    }
  }


  setupTaskProgressTracking() {
    this.subscriptionsProgressTasks = new Subscription();

    this.currentTasks.forEach(task => {
      const subscription = this.taskWsService
        .setupTaskProgressTrackingWS(task.id)
        .subscribe(message => {
          this.updateTaskProgress(message.progressData);
          this.cdr.detectChanges();
        });

      this.subscriptionsProgressTasks.add(subscription);
    });
  }

  setupTaskFinishTracking() {
    this.subscriptionsFinishedTasks = new Subscription();

    this.currentTasks.forEach(task => {
      const subscription = this.taskWsService
        .setupTaskFinishedTrackingWS(task.id)
        .subscribe(message => {
          this.updateTaskProgress(message);
          this.cdr.detectChanges();
        });

      this.subscriptionsFinishedTasks.add(subscription);
    });
  }

  ngOnDestroy() {
    if (this.subscriptionsProgressTasks) {
      this.subscriptionsProgressTasks.unsubscribe();
    }
    if (this.subscriptionsFinishedTasks) {
      this.subscriptionsFinishedTasks.unsubscribe();
    }
  }
}
