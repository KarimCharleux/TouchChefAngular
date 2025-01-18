import {Task} from '../dashboard/burger.model';
import {Cook} from '../device.service';
import {FROM_TO_VALUES} from '../enums/fromToValuesEnum';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {WebSocketService} from '../websocket.service';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {RecipeItem} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class TaskWebSocketService {

  constructor(private wsService: WebSocketService) {
  }

  private unactiveTaskConst: string = "unactiveTask";

  sendTask(task: Task, cook: Cook): void {
    this.wsService.sendMessage(this.createTaskToSend(cook, task));
  }

  private createTaskToSend(cook: Cook, task: Task): TaskToSend {
    return {
      from: FROM_TO_VALUES.ANGULAR,
      to: cook.deviceId,
      type: WebSocketMessageTypeEnum.ADD_TASK,
      assignedTask: {
        taskId: task.id,
        taskName: task.name,
        taskIcons: task.icons,
        cook: cook,
        quantity: task.quantity,
        workStation: task.workStation,
        duration: task.duration
      }
    }
  }

  setupTaskProgressTrackingWS(): TrackingResult | null {

    let currentMessage: TaskProgressMessage | null = null;

    const subscription = this.wsService
      .waitMessage()
      .subscribe(message => {
        const taskProgressMessage = message as TaskProgressMessage;
        if (taskProgressMessage.type === WebSocketMessageTypeEnum.TASK_PROGRESS) {
          currentMessage = taskProgressMessage;
        }
      });

    return {
      subscription: subscription,
      message: currentMessage
    };
  }


  unactiveTaskOnTable(task: Task, playerId: string) {
    if (task.assignedCooks) {
      this.wsService.sendMessage({
        from: playerId,
        to: FROM_TO_VALUES.TABLE,
        type: this.unactiveTaskConst
      })
    }
  }

  unactiveTaskOnWatch(task: Task, playerId: string) {
    if (task.assignedCooks) {
      this.wsService.sendMessage({
        from: FROM_TO_VALUES.ANGULAR,
        to: playerId,
        type: this.unactiveTaskConst
      })
    }
  }

  unactiveTask(task: Task) {
    if (task.assignedCooks) {
      this.wsService.sendMessage({
        from: FROM_TO_VALUES.ANGULAR,
        to: 'all',
        type: this.unactiveTaskConst,
        taskID: task.id
      })
    }
  }

  waitUnactiveTaskMessage(unactive_task_method: TASK) {
    this.wsService.waitMessage().subscribe(message => {
      if (message.type === this.unactiveTaskConst && message.to === FROM_TO_VALUES.ANGULAR) {
        unactive_task_method(message.taskId, message.from);
      }
    });
  }

  sendRecipeItemsToTable(recipeItems: RecipeItem[]): void {
    this.wsService.sendMessage(this.createRecipeItemsToSend(recipeItems));
  }

  private createRecipeItemsToSend(recipeItems: RecipeItem[]): RecipeItemToSend {
    return {
      from: FROM_TO_VALUES.ANGULAR,
      to: FROM_TO_VALUES.TABLE,
      type: WebSocketMessageTypeEnum.RECIPE,
      recipeItems: recipeItems
    };
  }
}

interface RecipeItemToSend {
  from: FROM_TO_VALUES;
  to: FROM_TO_VALUES;
  type: WebSocketMessageTypeEnum;
  recipeItems: RecipeItem[]
}

interface TaskToSend {
  from: FROM_TO_VALUES;
  to: FROM_TO_VALUES | string;
  type: WebSocketMessageTypeEnum;
  assignedTask: AssignedTask
}

export interface AssignedTask {
  taskId: string;
  taskName: string;
  taskIcons: string;
  cook: Cook;
  quantity: number;
  workStation?: string;
  duration?: number;
}

export interface ProgressData {
  taskId: string;
  playerId: string;
  currentProgress: number;
  targetProgress: number;
}

interface TaskProgressMessage {
  type: string;
  from: string;
  to: string;
  progressData: ProgressData;
}

interface TrackingResult {
  subscription: Subscription;
  message: TaskProgressMessage | null;
}

interface TASK {
  (taskId: string, deviceId: string): void
}
