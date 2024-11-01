import {Routes} from '@angular/router';
import {HomeMenuComponent} from './home-menu/home-menu.component';
import {TutorialComponent} from './tutorial/tutorial.component';

export const routes: Routes = [
  {
    path: '', component: HomeMenuComponent,
  },
  {
    path: 'tutorial', component: TutorialComponent,
  }
];
