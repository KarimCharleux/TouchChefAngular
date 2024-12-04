import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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

  currentTime: number = this.totalTime; // Temps restant
  progressWidth: string = '100%'; // Largeur de la barre de progression

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    const interval = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.updateProgress(); // Met à jour la largeur de la barre
      } else {
        clearInterval(interval); // Arrête le timer
      }
    }, 1000);
  }

  updateProgress() {
    this.progressWidth = `${(this.currentTime / this.totalTime) * 100}%`;
    this.cdr.detectChanges(); // Force la mise à jour de la vue
  }

}
