import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CountdownComponent} from '../countdown/countdown.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CountdownComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
