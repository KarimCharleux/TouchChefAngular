import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  @Input() showEarnedStars: boolean = false;
  @Input() showStopGameButton: boolean = false;
  @Input() nbEarnedStars: number = 15;

}
