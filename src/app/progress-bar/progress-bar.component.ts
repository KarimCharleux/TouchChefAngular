import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
  currentProgress: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      this.currentProgress = Math.min(100, Math.max(0, this.progress));
    }
  }
}
