import {Routes} from '@angular/router';
import {HomeMenuComponent} from './home/home-menu.component';
import {TutorialComponent} from './tutorial/tutorial.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { FinishComponent } from './finish/finish.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import {ShopComponent} from './main-chef-cuisinier/shop/shop.component';

export const routes: Routes = [
  {
    path: '', component: ShopComponent,
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
