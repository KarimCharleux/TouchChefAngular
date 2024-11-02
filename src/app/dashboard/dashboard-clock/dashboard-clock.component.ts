import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';

export type PomodoroStatus = 'pomodoro' | 'started' | 'paused';


@Component({
  selector: 'app-dashboard-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-clock.component.html',
  styleUrl: './dashboard-clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardClockComponent  implements OnDestroy {
  @Output() statusChange = new EventEmitter<PomodoroStatus>();
  @Output() timeChange = new EventEmitter<number>();
  @Input() durationTime!: number;

  // State management
  formatedTime!: string;
  timer!: number;
  status: PomodoroStatus = 'pomodoro';
  interval: any;

  // Audio
  private pomodoroSound: HTMLAudioElement;

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize audio
    this.pomodoroSound = new Audio("assets/sounds/notification.wav");
  }
  
  ngOnInit() {
    this.timer = this.durationTime;
    this.formatedTime = this.formatTime(this.timer);
  }
  
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Display formatters
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Timer controls
  start(): void {
    if (!this.interval) {
      this.status = 'started';
      this.statusChange.emit(this.status);
      this.interval = setInterval(() => {
        this.timer--;
        this.timeChange.emit(this.timer);
        this.formatedTime = this.formatTime(this.timer);
        this.cdr.detectChanges();
        if (this.timer <= 0) {
          this.pomodoroSound.play();
          this.reset();
        }
      }, 1000);
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.status = 'paused';
      this.statusChange.emit(this.status);
    }
  }

  reset(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.status = 'pomodoro';
    this.timer = this.durationTime;
    this.statusChange.emit(this.status);
    this.timeChange.emit(this.timer);
  }
}