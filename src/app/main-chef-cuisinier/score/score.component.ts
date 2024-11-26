import { ChangeDetectionStrategy, Component } from '@angular/core';
import {StarsComponent} from '../../stars/stars.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    StarsComponent
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {

  nbEarnedStars: number = 15;

}
