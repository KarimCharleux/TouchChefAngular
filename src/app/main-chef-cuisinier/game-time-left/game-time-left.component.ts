import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BarTimerComponent} from '../../bar-timer/bar-timer.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-game-time-left',
  standalone: true,
  imports: [
    BarTimerComponent,
    NgOptimizedImage

  ],
  templateUrl: './game-time-left.component.html',
  styleUrl: './game-time-left.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTimeLeftComponent {

}
