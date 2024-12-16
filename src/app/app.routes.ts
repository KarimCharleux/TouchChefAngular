import { Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { FinishComponent } from './finish/finish.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { MainPageComponent } from './main-chef-cuisinier/main-page/main-page.component';
import { HomeMenuComponent } from './home/home-menu.component';
import { CountdownComponent } from './dashboard/countdown/countdown.component';
import {RaiseHandsFinalComponent} from './raise-hands-final/raise-hands-final.component';

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
    path: 'main-page',
    component: MainPageComponent,
  },
  {
    path: 'finish',
    component: FinishComponent
  },
  {
    path: 'countdown',
    component: CountdownComponent,
  },
];
