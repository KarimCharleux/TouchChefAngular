import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-bar-timer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './bar-timer.component.html',
  styleUrl: './bar-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarTimerComponent implements OnInit {
  @Input() width: string = '100%'; // Largeur par défaut
  @Input() height: string = '24px'; // Hauteur par défaut
  @Input() totalTime: number = 60; // Temps total en secondes
  @Input() barColor: string = '#3498db'; // Nouvelle propriété pour la couleur
  @Input() isStarted: boolean = false;

  @Output() timerComplete = new EventEmitter<void>(); // Émet un événement lorsque le temps est écoulé

  currentTime: number = 0; // Temps restant
  progressWidth: string = '100%'; // Largeur de la barre de progression
  private interval?: any;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.currentTime = this.totalTime;
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isStarted'] && changes['isStarted'].currentValue === true) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.updateProgress(); // Met à jour la largeur de la barre
      } else {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.timerComplete.emit(); // Émet l'événement
      }
    }, 1000);
  }

  updateProgress() {
    this.progressWidth = `${(this.currentTime / this.totalTime) * 100}%`;

    this.cdr.detectChanges(); // Force la mise à jour de la vue
  }

}
