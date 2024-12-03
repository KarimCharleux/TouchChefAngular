import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-minuteur',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './minuteur.component.html',
  styleUrl: './minuteur.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinuteurComponent {

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

}
