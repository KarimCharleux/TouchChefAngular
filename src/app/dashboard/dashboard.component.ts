import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { DashboardClockComponent } from "./dashboard-clock/dashboard-clock.component";
import { PomodoroStatus } from './dashboard-clock/dashboard-clock.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CountdownComponent,
    DashboardHeaderComponent,
    DashboardClockComponent,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  @ViewChild(DashboardClockComponent) clockComponent!: DashboardClockComponent;
  
  currentStatus: PomodoroStatus = 'pomodoro';
  currentTime: number = 0;
  durationTime: number = 5 * 60; // 5 minutes * 60 seconds to convert to seconds

  onStatusChange(status: PomodoroStatus) {
    this.currentStatus = status;
  }

  onTimeChange(time: number) {
    this.currentTime = time;
  }

  startTimer() {
    this.clockComponent.start();
  }

  stopTimer() {
    this.clockComponent.stop();
  }

  resetTimer() {
    this.clockComponent.reset();
  }
}
