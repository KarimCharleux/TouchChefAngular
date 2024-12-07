import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Subject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly socket$: WebSocketSubject<any>;
  private readonly messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://websocket.chhilif.com:8080');

    this.socket$.subscribe({
      next: (message) => this.messagesSubject.next(message),
      error: (error) => console.error('WebSocket error:', error),
      complete: () => console.log('WebSocket connection closed')
    });
  }

  waitMessage(message: string): Observable<any> {
    return this.messages$;
  }

  sendMessage(message: any): void {
    console.log('Message envoyé:', message);
    
    this.socket$.next(message);
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}
