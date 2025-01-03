import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {StarsComponent} from '../../stars/stars.component';
import {DashboardHeaderWebSocketService} from './dashboard-header-websocket.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [NgIf, StarsComponent],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  @Input() nbEarnedStars: number = 15;
  @Input() showStopGameButton: boolean = false;

  constructor(private router: Router, private readonly dashboardHeaderWsService: DashboardHeaderWebSocketService) {}

  stopGame() {
    this.dashboardHeaderWsService.sendStopGame();
    this.router.navigate(['/']);
  }
}
