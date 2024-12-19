import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
  @Output() countdownComplete = new EventEmitter<void>();
  private readonly totalAnimationTime = 5000;
  private countdownSound: HTMLAudioElement;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.countdownSound = new Audio('/assets/sounds/countdown.mp3');
  }

  ngOnInit() {
    // Jouer le son dès le début
    setTimeout(() => {
      this.countdownSound.play().then();
    }, 1000);

    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.countdown').classList.add('hidden');
      this.countdownComplete.emit();
      // Arrêter le son avant la navigation
      this.countdownSound.pause();
      this.countdownSound.currentTime = 0;
      this.router.navigate(['/main-page']).then();
    }, this.totalAnimationTime);
  }

  ngOnDestroy() {
    // S'assurer que le son est arrêté si le composant est détruit
    if (this.countdownSound) {
      this.countdownSound.pause();
      this.countdownSound.currentTime = 0;
    }
  }
}
