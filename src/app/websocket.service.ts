import { Injectable } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly URL = 'ws://localhost:3000';
  private readonly webSocketSubject = webSocket<string>(this.URL);
  private readonly webSocket$ = this.webSocketSubject.asObservable();

  constructor() {}

  sendMessage(message: any): void {
    this.webSocketSubject.next(JSON.stringify(message));
  }

  getMessages() {
    return this.webSocket$;
  }
}
