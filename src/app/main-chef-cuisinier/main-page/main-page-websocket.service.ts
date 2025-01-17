import {Injectable} from '@angular/core';
import {WebSocketMessageTypeEnum} from '../../webSocketMessageTypeEnum';
import {WebSocketService} from '../../websocket.service';
import {filter, map, Observable} from 'rxjs';
import {FROM_TO_VALUES} from '../../enums/fromToValuesEnum';
import {Task} from '../../dashboard/burger.model';

@Injectable({
  providedIn: 'root',
})
export class MainPageWebSocketService {

  constructor(private readonly wsService: WebSocketService) {
  }

  sendTaskToTable(task: Task) {
    this.wsService.sendMessage(this.createObjectSendTaskToTable(task.id, task.name, task.icons));
  }

  private createObjectSendTaskToTable(taskId: string, taskName: string, taskIcons: string) {
    return {
      type: WebSocketMessageTypeEnum.TABLE_TASK,
      task: taskName,
      taskId: taskId,
      taskIcons: taskIcons,
      from: FROM_TO_VALUES.ANGULAR,
      to: FROM_TO_VALUES.TABLE,
    }
  }

  sendMessageStartGame() {
    this.wsService.sendMessage({type: WebSocketMessageTypeEnum.START_GAME});
  }

  sendMessageEndGame() {
    this.wsService.sendMessage({type: WebSocketMessageTypeEnum.END_GAME});
  }

  getBPMOfCook(deviceId: string): Observable<number> {
    return this.wsService.waitMessage()
      .pipe(
        filter(message =>
          message.from === deviceId && message.to === FROM_TO_VALUES.ANGULAR && message.type === WebSocketMessageTypeEnum.HEART_RATE
        ),
        map((message: { from: number; to: string; type: string; bpm: number, timestamp: number }) => message.bpm)
      );
  }

  listenToTableAssignments(): Observable<AssignTaskMessage> {
    return this.wsService.waitMessage().pipe(
      filter(message => 
        message.type === 'assign_task' && 
        message.from === 'table' && 
        message.to === 'angular'
      ),
      map(message => message as AssignTaskMessage)
    );
  }
}

interface onDropOnTableWebSocketObject {
  type: WebSocketMessageTypeEnum,
  task: string,
  taskId: string,
  taskIcons: string,
  from: FROM_TO_VALUES,
  to: FROM_TO_VALUES,
}

interface AssignTaskMessage {
  type: string;
  taskId: string;
  playerId: string;
  from: string;
  to: string;
}
