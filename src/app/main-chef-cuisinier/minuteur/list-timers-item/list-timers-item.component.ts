import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BarTimerComponent} from '../../../bar-timer/bar-timer.component';
import {NgOptimizedImage} from '@angular/common';
import {Cook} from '../../../device.service';

@Component({
  selector: 'app-list-timers-item',
  standalone: true,
  imports: [
    BarTimerComponent,
    NgOptimizedImage
  ],
  templateUrl: './list-timers-item.component.html',
  styleUrl: './list-timers-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTimersItemComponent {

  @Input() totalTime: number = 60;
  @Input() avatar: string = "unknown-icon";
  @Input() cookColor: string = "#3498db";

  @Output() timerComplete = new EventEmitter<void>();

  onTimerComplete() {
    this.timerComplete.emit();
  }

}

export interface Timer {
  timerDuration: number;
  cook: Cook;
}
