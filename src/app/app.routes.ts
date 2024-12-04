import {Routes} from '@angular/router';
import {TutorialComponent} from './tutorial/tutorial.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinishComponent} from './finish/finish.component';
import {ScanQrComponent} from './scan-qr/scan-qr.component';
import {BarTimerComponent} from './bar-timer/bar-timer.component';
import {ListTimersItemComponent} from './main-chef-cuisinier/minuteur/list-timers-item/list-timers-item.component';
import {MinuteurComponent} from './main-chef-cuisinier/minuteur/minuteur.component';
import {GameTimeLeftComponent} from './main-chef-cuisinier/game-time-left/game-time-left.component';

export const routes: Routes = [
  {
    path: '', component: GameTimeLeftComponent,
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
