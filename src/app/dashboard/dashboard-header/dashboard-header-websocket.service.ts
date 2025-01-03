import {Injectable} from '@angular/core';
import {WebSocketService} from '../../websocket.service';
import {FROM_TO_VALUES} from '../../enums/fromToValuesEnum';
import {WebSocketMessageTypeEnum} from '../../webSocketMessageTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class DashboardHeaderWebSocketService {

  constructor(private wsService: WebSocketService) {
  }

  sendStopGame(): void {
    this.wsService.sendMessage(this.createStopGameObjectToSend());
  }

  private createStopGameObjectToSend(): StopGameToSend {
    return {
      from: FROM_TO_VALUES.ANGULAR,
      to: "all",
      type: WebSocketMessageTypeEnum.STOP_GAME,
    }
  }
}

interface StopGameToSend {
  from: FROM_TO_VALUES;
  to: FROM_TO_VALUES | string;
  type: WebSocketMessageTypeEnum;
}

