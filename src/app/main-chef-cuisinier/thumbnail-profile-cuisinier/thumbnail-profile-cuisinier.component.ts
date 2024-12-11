import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {PlayerDataValueComponent} from './player-data-value/player-data-value.component';

@Component({
  selector: 'app-thumbnail-profile-cuisinier',
  standalone: true,
  imports: [
    NgOptimizedImage,
    PlayerDataValueComponent
  ],
  templateUrl: './thumbnail-profile-cuisinier.component.html',
  styleUrl: './thumbnail-profile-cuisinier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailProfileCuisinierComponent {

  @Input() $playerName: string = "Default name";
  @Input() $playerAvatar: string = "1";
  @Input() $playerHeartRate: number = 180;
  @Input() $playerActivity: number = 88;

}
