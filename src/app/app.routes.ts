import {Routes} from '@angular/router';
import {HomeMenuComponent} from './home/home-menu.component';
import {TutorialComponent} from './tutorial/tutorial.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '', component: HomeMenuComponent,
  },
  {
    path: 'tutorial', component: TutorialComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
  }
];
