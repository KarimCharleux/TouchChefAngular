import {ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Cook} from '../device.service';
import {Task} from '../dashboard/burger.model';
import {BURGERS} from '../dashboard/burgers.data';
import {ProgressData, TaskWebSocketService} from './task-websocket.service';
import {Subscription} from 'rxjs';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {NgForOf, NgIf} from '@angular/common';
import {DialogModule} from 'primeng/dialog';

@Injectable({
  providedIn: 'root'
})
@Component({
  template: `

  `,
  standalone: true
})
export class TaskService implements OnInit, OnDestroy {
  private currentTasks: Task[] = BURGERS[0].tasks; // TODO: change to current burger
  private indexOfLastAssignation: number = 0;
  private progressSubscription: Subscription | null = null;


  constructor(
    private taskWsService: TaskWebSocketService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.changeBurger(0); // TODO: change to current burger
    this.taskWsService.waitUnactiveTaskMessage(this.unassignTaskReceived.bind(this));
  }

  ngOnInit() {
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

  completeTask(taskId: string): void {
    const task = this.currentTasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = true;
    }
  }

  uncompleteTask(taskId: string): void {
    const task = this.currentTasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = false;
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

  updateTaskProgress(progressData: ProgressData) {
    if (progressData.currentProgress === progressData.targetProgress) {
      const task = this.currentTasks.find(t => t.id === progressData.taskId);
      if (task) {
        task.isCompleted = true
        this.taskWsService.unactiveTaskOnTable(task, progressData.playerId);
        this.taskWsService.unactiveTaskOnWatch(task, progressData.playerId)
      }
    }
  }

  setupTaskProgressTracking() {
    this.currentTasks.forEach(task => {

      const taskProgressTracking = this.taskWsService.setupTaskProgressTrackingWS();
      if (taskProgressTracking?.message?.type === WebSocketMessageTypeEnum.TASK_PROGRESS) {
        const progressData: ProgressData = taskProgressTracking.message.progressData;
        this.updateTaskProgress(progressData);
      }
    });
  }

  ngOnDestroy() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }
}
