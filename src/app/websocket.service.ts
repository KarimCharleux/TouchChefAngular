import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');

    this.socket$.subscribe({
      next: (message) => this.messagesSubject.next(message),
      error: (error) => console.error('WebSocket error:', error),
      complete: () => console.log('WebSocket connection closed')
    });
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}
