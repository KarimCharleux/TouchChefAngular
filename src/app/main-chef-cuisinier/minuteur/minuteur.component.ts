import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {ListTimersItemComponent} from './list-timers-item/list-timers-item.component';

@Component({
  selector: 'app-minuteur',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ListTimersItemComponent
  ],
  templateUrl: './minuteur.component.html',
  styleUrl: './minuteur.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinuteurComponent {

  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // Chiffres à afficher
  input: string[] = ['', '', '', ''];

  @Output() createTimer = new EventEmitter<number>(); // Événement pour le composant parent

  onNumberClick(number: string): void {
    // Remplir les espaces vides dans l'ordre
    const firstEmptyIndex = this.input.findIndex((val) => val === '');
    if (firstEmptyIndex !== -1) {
      this.input[firstEmptyIndex] = number;
    }

    // Transforme en 59 si les deux premiers chiffres ensemble dépassent 59
    if (firstEmptyIndex <= 1) { // Vérifie les deux premiers chiffres
      const minutes = parseInt(this.input.slice(0,2).join(''), 10);
      if (minutes > 59) {
        this.input[0] = '5'; // On fixe à 59 si la valeur dépasse 59
        this.input[1] = '9';
      }
    }

    // Transforme en 59 si les deux derniers chiffres ensemble dépassent 59
    if (firstEmptyIndex >= 2) { // Vérifie les deux derniers chiffres
      const secondes = parseInt(this.input.slice(2).join(''), 10);
      if (secondes > 59) {
        this.input[2] = '5'; // On fixe à 59 si la valeur dépasse 59
        this.input[3] = '9';
      }
    }
  }

  clearInput(): void {
    this.input = ['', '', '', ''];
  }

}
