import {Injectable} from '@angular/core';
import {WebSocketService} from '../websocket.service';
import {FROM_TO_VALUES} from '../enums/fromToValuesEnum';
import {WebSocketMessageTypeEnum} from '../webSocketMessageTypeEnum';
import {Cook} from '../device.service';


@Injectable({
  providedIn: 'root',
})
export class ScanQRWebSocketService {

  constructor(private readonly wsService: WebSocketService) {
  }

  sendAddCook(deviceId: string, cookName: string, selectedAvatar: string, selectedColor: string) {
    this.wsService.sendMessage(this.createObjectSendAddCook(deviceId, cookName, selectedAvatar, selectedColor));
  }

  private createObjectSendAddCook(deviceId: string, cookName: string, selectedAvatar: string, selectedColor: string): AddCookToSend {
    return {
      from: FROM_TO_VALUES.ANGULAR,
      to: deviceId,
      type: WebSocketMessageTypeEnum.ADD_COOK,
      name: cookName,
      avatar: selectedAvatar,
      avatarColor: selectedColor
    };
  }

  async sendCooksListToAll(cooks: Cook[]) {
    if (cooks) {
      console.log('Sending cooks list to all : ', cooks);
      this.wsService.sendMessage({
        from: FROM_TO_VALUES.ANGULAR,
        to: 'all',
        type: WebSocketMessageTypeEnum.COOKS_LIST,
        cooksList: cooks
      });
    }
  }

  addCookResponse(deviceId: string, resolve: (value: unknown) => void) {
    const subscription = this.wsService.messages$.subscribe(message => {
      try {
        if (message.type === WebSocketMessageTypeEnum.CONFIRMATION &&
          message.to === FROM_TO_VALUES.ANGULAR &&
          message.from === deviceId) {
          subscription.unsubscribe();
          resolve(message);
        }
      } catch (e) {
        console.error('Erreur de parsing du message:', e);
      }
    });
    return subscription;


  }
}

interface AddCookToSend {
  from: FROM_TO_VALUES,
  to: string,
  type: WebSocketMessageTypeEnum,
  name: string,
  avatar: string,
  avatarColor: string
}
