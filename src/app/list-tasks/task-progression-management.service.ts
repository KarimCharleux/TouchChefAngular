import { Injectable } from '@angular/core';
import {WebSocketService} from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class TaskProgressionManagementService {

  constructor(private wsService: WebSocketService) { }

  getProgressionFromTable(){
    this.wsService.waitMessage('{"type":"taskProgress","from":"unity","to":"angular","progressData":{"playerId":"sdk_gwear_x86_64-19d0de4ecec0fcc2","taskName":"Couper le steak","currentProgress":1,"targetProgress":1}}')
  }
}
