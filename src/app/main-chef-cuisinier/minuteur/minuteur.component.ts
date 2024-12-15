import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {ListTimersItemComponent, Timer} from './list-timers-item/list-timers-item.component';
import {ShareDataService} from '../../share-data.service';
import {Cook} from '../../device.service';
import {WebSocketService} from '../../websocket.service';
import {ShareDataServiceDataObject, ShareDataServiceTypes} from '../main-page/main-page.component';

@Component({
  selector: 'app-minuteur',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ListTimersItemComponent,
    NgClass
  ],
  templateUrl: './minuteur.component.html',
  styleUrl: './minuteur.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinuteurComponent implements OnInit {
  private readonly tapSound: HTMLAudioElement;
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']; // Chiffres à afficher
  input: string[] = ['0', '0'];

  id: number = 0;
  timers: { id: number, timer: Timer }[] = [];

  receivedObject?: Timer;

  constructor(private shareDataService: ShareDataService, private cdr: ChangeDetectorRef, private wsService: WebSocketService) {
    this.tapSound = new Audio('assets/sounds/tap.mp3');
  }

  ngOnInit() {
    this.shareDataService.data$.subscribe((data) => {
      const d: ShareDataServiceDataObject = data;
      if (d.dataType == ShareDataServiceTypes.ASSIGNED_TIMER) {
        if (d.object) {
          const assignedTimer: Timer = <Timer>d.object;
          this.receivedObject = assignedTimer;
          this.handleReceivedObject(assignedTimer);
        }
      }
    });
  }

  onNumberClick(number: string): void {
    this.tapSound.play().then();
    // Check if both inputs are already filled with non-zero values
    if (this.input[0] !== '0' && this.input[1] !== '0') {
      return; // Exit the function if inputs are filled
    }

    // Replace the last digit with the new number
    this.input[0] = this.input[1]; // Shift the current second digit to the first position
    this.input[1] = number; // Update the second digit with the clicked number

    // Ensure the combined value does not exceed 59
    const seconds = parseInt(this.input.join(''), 10);
    if (seconds > 59) {
      this.input[0] = '5';
      this.input[1] = '9';
    }
  }

  clearInput(): void {
    this.tapSound.play().then();
    this.input = ['0', '0'];
  }

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      let inputData = "timer/";
      inputData = inputData + this.input.join(''); // Convertit l'objet input en une chaîne ex: "1234"
      event.dataTransfer.setData('text/plain', inputData); // Ajoute les données dans le DataTransfer
    }
  }

  handleReceivedObject(timer: Timer) {
    this.clearInput();
    this.addTimer(timer);
  }

  addTimer(timer: Timer): void {

    this.sendTimerToRightWatch(timer.cook, timer.timerDuration.toString());
    this.timers.push({id: this.id++, timer: timer});
    this.cdr.detectChanges();
  }

  async sendTimerToRightWatch(cook: Cook, timerDuration: string) {
    this.wsService.sendMessage({
      from: 'angular',
      to: cook.deviceId,
      type: 'addTimer',
      timer: {timerId: this.id.toString(), timerDuration: timerDuration}
    });
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
