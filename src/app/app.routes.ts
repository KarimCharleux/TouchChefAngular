import {Routes} from '@angular/router';
import {TutorialComponent} from './tutorial/tutorial.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinishComponent} from './finish/finish.component';
import {ScanQrComponent} from './scan-qr/scan-qr.component';
import {BarTimerComponent} from './bar-timer/bar-timer.component';

export const routes: Routes = [
  {
    path: '', component: BarTimerComponent,
  },
  {
    path: 'scan-qr', component: ScanQrComponent,
  },
  {
    path: 'tutorial', component: TutorialComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: 'finish',
    component: FinishComponent
  }
];
