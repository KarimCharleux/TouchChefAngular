import {FROM_TO_VALUES} from '../enums/fromToValuesEnum';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {WebSocketService} from '../websocket.service';
import {Injectable} from '@angular/core';
import {Timer} from './timer.service';

@Injectable({
  providedIn: 'root',
})
export class TimerWebSocketService {

  constructor(private wsService: WebSocketService) {
  }

  waitTimerMessage(start_timer_method: START_TIMER){
    this.wsService.waitMessage().subscribe(message => {
      if (message.type === WebSocketMessageTypeEnum.START_TIMER && message.to === FROM_TO_VALUES.ANGULAR) {
        start_timer_method(parseInt(message.timerId), message.from);
      }
    });
  }

  sendTimer(timer: Timer): void {
    if (timer.cook) {
      this.wsService.sendMessage(this.createTimerToSend(timer));
    }
  }

  private createTimerToSend(timer: Timer): TimerToSend {
    return {
      from: FROM_TO_VALUES.ANGULAR,
      to: timer.cook.deviceId,
      type: WebSocketMessageTypeEnum.ADD_TIMER,
      timer: {
        timerId: timer.id.toString(),
        timerDuration: timer.duration.toString()
      }
    }
  }
}

interface TimerToSend {
  from: FROM_TO_VALUES;
  to: FROM_TO_VALUES | string;
  type: WebSocketMessageTypeEnum;
  timer: MinimalistTimer
}

interface MinimalistTimer {
  timerId: string;
  timerDuration: string;
}

interface START_TIMER {
  (timerId: number, deviceId: string): void
}

