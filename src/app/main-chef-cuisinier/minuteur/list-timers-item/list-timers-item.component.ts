import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BarTimerComponent} from '../../../bar-timer/bar-timer.component';
import {NgOptimizedImage} from '@angular/common';

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

}
