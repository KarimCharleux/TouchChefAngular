import {Injectable} from '@angular/core';
import {WebSocketMessageTypeEnum} from '../../webSocketMessageTypeEnum';
import {WebSocketService} from '../../websocket.service';
import {filter, map, Observable} from 'rxjs';
import {FROM_TO_VALUES} from '../../enums/fromToValuesEnum';

@Injectable({
  providedIn: 'root',
})
export class MainPageWebSocketService {

  constructor(private readonly wsService: WebSocketService) {
  }

  sendTaskToTable(taskId: string, taskName: string, taskIcons: string) {
    this.wsService.sendMessage(this.createObjectSendTaskToTable(taskId, taskName, taskIcons));
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

  getBPMOfCook(deviceId: string): Observable<number> {
    return this.wsService.waitMessage()
      .pipe(
        filter(message =>
          message.from === deviceId && message.to === FROM_TO_VALUES.ANGULAR && message.type === WebSocketMessageTypeEnum.HEART_RATE
        ),
        map((message: { from: number; to: string; type: string; bpm: number, timestamp: number }) => message.bpm)
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
