import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {StarsComponent} from '../../stars/stars.component';

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

  constructor(private router: Router) {}

  stopGame() {
    // TODO: Send message to Unity
    this.router.navigate(['/']);
  }
}
