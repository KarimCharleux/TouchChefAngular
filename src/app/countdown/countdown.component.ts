import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {

}
