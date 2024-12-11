import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly socket$: WebSocketSubject<any>;
  private readonly messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://websocket.chhilif.com/ws');

    this.socket$.subscribe({
      next: (message) => this.messagesSubject.next(message),
      error: (error) => console.error('WebSocket error:', error),
      complete: () => console.log('WebSocket connection closed')
    });
  }

  waitMessage(message: string): Observable<any> {
    return this.messages$;
  }

  /* Message format :
  {from: 'angular', to: this.currentDeviceId,
  type: 'addCook', name: this.cookName,
  avatar: this.selectedAvatar.toString()};*/
  sendMessage(message: any): void {
    console.log('Message envoyé:', message);

    this.socket$.next(message);
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}
