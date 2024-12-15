import { Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinishComponent } from './finish/finish.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { MainPageComponent } from './main-chef-cuisinier/main-page/main-page.component';
import { HomeMenuComponent } from './home/home-menu.component';
import { CountdownComponent } from './dashboard/countdown/countdown.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeMenuComponent,
  },
  {
    path: 'scan-qr',
    component: ScanQrComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
  },
  {
    path: 'finish',
    component: RaiseHandsFinalComponent
  },
  {
    path: 'countdown',
    component: CountdownComponent,
  },
];
