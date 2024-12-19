import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Timer, TimerService} from './timer.service';
import {BarTimerComponent} from '../bar-timer/bar-timer.component';
import {Subscription} from 'rxjs';
import {DataTransferTypeEnum} from '../enums/dataTransferTypeEnum';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgForOf, NgOptimizedImage, BarTimerComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  input: string[] = ['0', '0'];
  private readonly tapSound: HTMLAudioElement;
  private timerSubscription?: Subscription;
  timers: Timer[] = [];

  constructor(
    protected timerService: TimerService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.tapSound = new Audio('assets/sounds/tap.mp3');
  }

  ngOnInit() {
    this.timerSubscription = this.timerService.timers$.subscribe(timers => {
      this.timers = timers;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  onNumberClick(number: string): void {
    this.tapSound.play().then();
    if (this.input[0] !== '0' && this.input[1] !== '0') {
      return;
    }
    this.input[0] = this.input[1];
    this.input[1] = number;

    const seconds = parseInt(this.input.join(''), 10);
    if (seconds > 59) {
      this.input[0] = '5';
      this.input[1] = '9';
    }
  }

  clearInput(): void {
    this.tapSound.play().then();
    this.input = ['0', '0'];
  }

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const duration = parseInt(this.input.join(''), 10);
      event.dataTransfer.setData('text/plain', `${DataTransferTypeEnum.TIMER}/${duration}`);
    }
  }

  onTimerComplete(id: number) {
    this.timerService.removeTimer(id);
  }
}
