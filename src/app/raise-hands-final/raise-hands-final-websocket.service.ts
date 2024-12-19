import {Injectable} from '@angular/core';

import {Cook} from '../device.service';
import {WebSocketService} from '../websocket.service';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {filter, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaiseHandsFinalWebSocketService {

  constructor(private readonly wsService: WebSocketService) {
  }

  listenToHandRaise(cook: Cook): Observable<void> {
    return this.wsService.waitMessage().pipe(
      map(message => message as RaisedMessage),
      filter(message =>
        message.type === WebSocketMessageTypeEnum.HAND_RAISE &&
        message.from === cook.deviceId
      ),
      map(() => void 0) // garantit qu'on renvoie bien un Observable<void>
    );
  }
}

interface RaisedMessage {
  type: string;
  from: string;
  to: string;
  timestamp: number;
}

