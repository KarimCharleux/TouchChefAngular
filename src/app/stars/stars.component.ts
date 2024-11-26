import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-stars',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsComponent {

  @Input() nbEarnedStars: number = 0;

}
