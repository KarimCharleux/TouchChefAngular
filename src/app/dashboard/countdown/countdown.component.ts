import { ChangeDetectionStrategy, Component, ElementRef, Output, EventEmitter } from '@angular/core';

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
  private readonly totalAnimationTime = 4000;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.countdown').classList.add('hidden');
      this.countdownComplete.emit();
    }, this.totalAnimationTime);
  }
}
