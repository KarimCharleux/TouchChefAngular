import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { KnobModule } from 'primeng/knob';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-player-data-value',
  standalone: true,
  imports: [
    NgOptimizedImage,
    KnobModule,
    FormsModule
  ],
  templateUrl: './player-data-value.component.html',
  styleUrl: './player-data-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerDataValueComponent {

  defaultSize: number = 52;
  @Input() playerData: number = 0;

  @Input() pathToIcon: string = "/assets/unknown-icon.svg";
  @Input() alternativeText: string = "alternative text";
  @Input() iconHeight: number = this.defaultSize;
  @Input() iconWidth: number = this.defaultSize;

  getGradientColor() {
    return `hsl(0, 100%, ${100 - this.playerData/4}%)`;
  }
}
