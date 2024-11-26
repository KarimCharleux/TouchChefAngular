import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import { DashboardClockComponent } from "../dashboard-clock/dashboard-clock.component";
import { Router } from '@angular/router';
import {StarsComponent} from '../../stars/stars.component';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    NgIf,
    DashboardClockComponent,
    StarsComponent
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  nbEarnedStars: number = 15;

  constructor(private router: Router) {}

  stopGame() {
    // TODO: Send message to Unity
    this.router.navigate(['/']);
  }

  @Input() showStopGameButton: boolean = false;


}
