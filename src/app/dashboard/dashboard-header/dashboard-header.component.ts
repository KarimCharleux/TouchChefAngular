import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import { DashboardClockComponent } from "../dashboard-clock/dashboard-clock.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    NgIf,
    DashboardClockComponent
],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  constructor(private router: Router) {}

  stopGame() {
    // TODO: Send message to Unity
    this.router.navigate(['/']);
  }

  @Input() showEarnedStars: boolean = false;
  @Input() showStopGameButton: boolean = false;
  @Input() nbEarnedStars: number = 15;

}
