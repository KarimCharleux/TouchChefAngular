import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {KnobModule} from 'primeng/knob';
import {FormsModule} from '@angular/forms';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-player-data-value',
  standalone: true,
  imports: [
    KnobModule,
    FormsModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './player-data-value.component.html',
  styleUrl: './player-data-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerDataValueComponent {
  maxValue: number = 150;
  defaultSize: number = 52;
  @Input() playerData: number = 0;
  @Input() iconColor: string = "#ffffff";
  @Input() iconType: "heart" | "thunder" = "heart";
  @Input() alternativeText: string = "alternative text";
  @Input() iconHeight: number = this.defaultSize;
  @Input() iconWidth: number = this.defaultSize;

  getGradientColor() {
    // Calculer l'opacité en fonction de playerData (0-maxValue)
    const opacity = this.playerData / this.maxValue;
    // Convertir la couleur hexadécimale en RGBA
    const result = this.hexToRGBA(this.iconColor, opacity);
    return result;
  }

  // Fonction utilitaire pour convertir hex en RGBA
  private hexToRGBA(hex: string, opacity: number): string {
    // Enlever le # si présent
    hex = hex.replace('#', '');

    // Convertir en RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Retourner la couleur RGBA
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  getTextStyle() {
    return {
      '--text-color': this.iconColor
    };
  }
}
