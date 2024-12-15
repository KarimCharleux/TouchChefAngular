import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
  EventEmitter, Output
} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-game-time-left',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './game-time-left.component.html',
  styleUrl: './game-time-left.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTimeLeftComponent implements OnInit, OnDestroy {

  @Input() gameDuration: number = 250;
  @Output() timerComplete = new EventEmitter<void>();

  minutes: string = '00';
  seconds: string = '00';
  isTimeRunningOut: boolean = false;
  progressBarColor: string = '#4CAF50';
  progressWidth: string = '100%';
  private timer: any;
  currentTime: number = 0;
  private timerSound: HTMLAudioElement;
  private timerSoundPlaying: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.timerSound = new Audio('/assets/sounds/timer.mp3');
  }

  ngOnInit() {
    this.currentTime = this.gameDuration;
    this.updateDisplay();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.resetTimer();
  }

  resetTimer() {
    this.currentTime = this.gameDuration;
    this.updateDisplay();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.currentTime--;
      this.updateDisplay();
      this.updateProgressBarColor();

      if (this.currentTime <= 0) {
        clearInterval(this.timer);
        this.onTimerComplete();
      }

      if (this.currentTime === 6 && !this.timerSoundPlaying) {
        this.timerSound.play().then(() => {
          this.timerSoundPlaying = true;
        });
      }

      this.cdr.detectChanges();
    }, 1000);
  }

  private updateDisplay() {
    const mins = Math.floor(this.currentTime / 60);
    const secs = this.currentTime % 60;
    this.minutes = mins.toString().padStart(2, '0');
    this.seconds = secs.toString().padStart(2, '0');
    this.progressWidth = `${(this.currentTime / this.gameDuration) * 100}%`;
  }

  private updateProgressBarColor() {
    const timePercentage = (this.currentTime / this.gameDuration) * 100;

    if (timePercentage <= 20) {
      this.progressBarColor = '#FF5252';
      this.isTimeRunningOut = true;
    } else if (timePercentage <= 50) {
      this.progressBarColor = '#FFC107';
      this.isTimeRunningOut = false;
    } else {
      this.progressBarColor = '#4CAF50';
      this.isTimeRunningOut = false;
    }
  }

  onTimerComplete() {
    this.timerComplete.emit()
  }

}
