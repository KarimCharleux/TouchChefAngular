import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {PlayerDataValueComponent} from './player-data-value/player-data-value.component';
import {HostBinding} from '@angular/core';

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
  @HostBinding('class') class: string = "profile-cuisinier";
  @HostBinding('style.border') get border() {
    return `7px solid ${this.$playerColor}20`;
  }

  @Input() $playerName: string = "Default name";
  @Input() $playerAvatar: string = "1";
  @Input() $playerHeartRate: number = 60;
  @Input() $playerActivity: number = 88;
  @Input() $playerColor: string = "#ffffff";

}
