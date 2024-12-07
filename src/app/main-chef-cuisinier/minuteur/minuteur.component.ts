import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {ListTimersItemComponent, Timer} from './list-timers-item/list-timers-item.component';
import {ShareDataService} from '../../share-data.service';
import {Cook} from '../../device.service';
import {WebSocketService} from '../../websocket.service';

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
export class MinuteurComponent implements OnInit {

  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // Chiffres à afficher
  input: string[] = ['', '', '', ''];

  id: number = 0;
  timers: { id: number, timer: Timer }[] = [];

  receivedObject?: Timer = undefined;

  constructor(private shareDataService: ShareDataService, private cdr: ChangeDetectorRef, private wsService: WebSocketService) {
  }

  ngOnInit() {
    this.shareDataService.data$.subscribe((data) => {
      this.receivedObject = data;
      this.handleReceivedObject(data);
    });
  }

  onNumberClick(number: string): void {
    // Remplir les espaces vides dans l'ordre
    const firstEmptyIndex = this.input.findIndex((val) => val === '');
    if (firstEmptyIndex !== -1) {
      this.input[firstEmptyIndex] = number;
    }

    // Transforme en 59 si les deux premiers chiffres ensemble dépassent 59
    if (firstEmptyIndex <= 1) { // Vérifie les deux premiers chiffres
      const minutes = parseInt(this.input.slice(0, 2).join(''), 10);
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

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const inputData = this.input.join(''); // Convertit l'objet input en une chaîne ex: "1234"
      event.dataTransfer.setData('text/plain', inputData); // Ajoute les données dans le DataTransfer
    }
  }

  handleReceivedObject(timer: Timer) {
    this.clearInput();
    this.addTimer(timer);
  }

  addTimer(timer: Timer): void {

    this.sendTimerToRightWatch(timer.cook);
    this.timers.push({id: this.id++, timer: timer});
    this.cdr.detectChanges();
  }

  async sendTimerToRightWatch(cook: Cook) {
    this.wsService.sendMessage({from: 'angular', to: cook.deviceId, type: 'addTimer', avatar: cook.avatar});
  }

  onTimerComplete(id: number) {
    this.removeTimer(id);
  }

  removeTimer(id: number): void {
    this.timers.forEach((element, index) => {
      if (id === element.id) {
        this.timers.splice(index, 1);
      }
    });
  }
}
