import {Injectable} from '@angular/core';
import {Cook} from '../device.service';
import {WebSocketService} from '../websocket.service';
import {BehaviorSubject} from 'rxjs';
import {TimerWebSocketService} from './timer-websocket.service';


export interface Timer {
  id: number;
  duration: number;
  cook: Cook;
  isStarted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timers = new BehaviorSubject<Timer[]>([]);
  timers$ = this.timers.asObservable();
  private currentId = 0;

  constructor(private readonly wsService: WebSocketService, private readonly timerWsService: TimerWebSocketService) {
    this.timerWsService.waitTimerStartMessage(this.startTimer);
    this.timerWsService.waitTimerRefuseMessage(this.refuseTimer);
  }

  getTimers(): Timer[] {
    return this.timers.value;
  }

  assignTimerToCook(duration: number, cook: Cook): void {
    const timer: Timer = {
      id: this.currentId++,
      duration,
      cook,
      isStarted: false
    };
    this.timers.next([...this.timers.value, timer]);
    this.timerWsService.sendTimer(timer);
  }

  startTimer(timerId: number, deviceId: string): void {
    const timer = this.timers.value.find(t => t.id === timerId);
    if (timer && timer.cook.deviceId === deviceId) {
      timer.isStarted = true;
      this.timers.next(this.timers.value);
      console.log("Démarrage du timer de " + timer.duration + "s pour " + timer.cook.name);
    }
  }

  refuseTimer(timerId: number, deviceId: string): void {
    const timer = this.timers.value.find(t => t.id === timerId);
    if (timer && timer.cook.deviceId === deviceId) {
      const cookName: string = timer.cook.name;
      this.removeTimer(timerId);
      console.log("Suppression du timer associé à " + cookName);
    }
  }

  removeTimer(id: number): void {
    const updatedTimers = this.timers.value.filter(t => t.id !== id);
    this.timers.next(updatedTimers);
  }
}
