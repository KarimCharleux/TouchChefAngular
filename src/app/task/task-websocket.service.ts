import {Task} from '../dashboard/burger.model';
import {Cook} from '../device.service';
import {FROM_TO_VALUES} from '../enums/fromToValuesEnum';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {WebSocketService} from '../websocket.service';
import {Injectable} from '@angular/core';
import {RecipeItem} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class TaskWebSocketService {

  constructor(private wsService: WebSocketService) {
  }

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
