import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
  private readonly totalAnimationTime = 4000; // 4 secondes, basé sur votre variable $totalAT

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.countdown').classList.add('hidden');
    }, this.totalAnimationTime);
  }
}
