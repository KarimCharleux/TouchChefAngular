import {Injectable} from '@angular/core';
import {WebSocketService} from '../../websocket.service';
import {WebSocketMessageTypeEnum} from '../../webSocketMessageTypeEnum';
import {FROM_TO_VALUES} from '../../enums/fromToValuesEnum';
import {Product} from './shop.component';

@Injectable({
  providedIn: 'root',
})
export class ShopWebSocketService {

  constructor(private readonly wsService: WebSocketService) {
  }

  sendShopItemToTable(product: Product) {
    this.wsService.sendMessage(this.createObjectSendShopItemToTable(product));
  }

  private createObjectSendShopItemToTable(product: Product): ShopItemToSend {
    return {
      type: WebSocketMessageTypeEnum.ADD_PRODUCT,
      product: product,
      from: FROM_TO_VALUES.ANGULAR,
      to: FROM_TO_VALUES.TABLE,
    }
  }
}

interface ShopItemToSend {
  type: WebSocketMessageTypeEnum,
  product: Product,
  from: FROM_TO_VALUES,
  to: FROM_TO_VALUES,
}
