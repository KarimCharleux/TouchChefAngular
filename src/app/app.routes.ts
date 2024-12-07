import {Routes} from '@angular/router';
import {TutorialComponent} from './tutorial/tutorial.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { FinishComponent } from './finish/finish.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import {ListTasksComponent} from './list-tasks/list-tasks.component';
import {MainPageComponent} from './main-chef-cuisinier/main-page/main-page.component';
import {HomeMenuComponent} from './home/home-menu.component';

export const routes: Routes = [
  {
    path: '', component: ListTasksComponent,
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
    path: 'main-page', component: MainPageComponent,
  },
  {
    path: 'finish',
    component: FinishComponent
  }
];
