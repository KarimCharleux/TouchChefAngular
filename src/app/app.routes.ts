import { Routes } from '@angular/router';
import {HomeMenuComponent} from './home-menu/home-menu.component';
import {CommentPanelComponent} from './comment-panel/comment-panel.component';

export const routes: Routes = [
  {
    path: '', component: HomeMenuComponent
  }
];
