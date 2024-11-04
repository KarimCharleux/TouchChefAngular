import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TimerStatus = 'ready' | 'started' | 'paused';

@Component({
  selector: 'app-dashboard-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-clock.component.html',
  styleUrl: './dashboard-clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardClockComponent implements OnInit, OnDestroy {
  @Output() statusChange = new EventEmitter<TimerStatus>();
  @Output() timeChange = new EventEmitter<number>();
  @Output() timeEnd = new EventEmitter<void>();
  @Input() durationTime!: number;

  // State management
  formatedTime!: string;
  timer!: number;
  status: TimerStatus = 'ready';
  interval: any;

  // Audio
  private readonly timerSound: HTMLAudioElement;
  private isTimerSoundPlaying: boolean = false;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.timerSound = new Audio("assets/sounds/timer.mp3");
    this.timerSound.loop = true; // La musique du timer tourne en boucle
  }
  
  ngOnInit() {
    this.timer = this.durationTime;
    this.formatedTime = this.formatTime(this.timer);
  }
  
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.timerSound.pause();
    this.timerSound.currentTime = 0;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  start(): void {
    if (!this.interval) {
      this.status = 'started';
      this.statusChange.emit(this.status);
      this.interval = setInterval(() => {
        this.timer--;
        this.timeChange.emit(this.timer);
        this.formatedTime = this.formatTime(this.timer);
        
        // Jouer le son du timer 10 secondes avant la fin
        if (this.timer === 8 && !this.isTimerSoundPlaying) {
          this.timerSound.play().then();
          this.isTimerSoundPlaying = true;
        }
        
        // Fin du timer
        if (this.timer <= 0) {
          this.timerSound.pause();
          this.timerSound.currentTime = 0;
          this.timeEnd.emit();
          clearInterval(this.interval);
          this.interval = null;
        }
        
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.status = 'paused';
      this.statusChange.emit(this.status);
      
      // Arrêter le son du timer si en cours
      if (this.isTimerSoundPlaying) {
        this.timerSound.pause();
        this.timerSound.currentTime = 0;
        this.isTimerSoundPlaying = false;
      }
    }
  }

  reset(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.status = 'ready';
    this.timer = this.durationTime;
    this.statusChange.emit(this.status);
    this.timeChange.emit(this.timer);
    
    // Arrêter le son du timer si en cours
    if (this.isTimerSoundPlaying) {
      this.timerSound.pause();
      this.timerSound.currentTime = 0;
      this.isTimerSoundPlaying = false;
    }
  }
}