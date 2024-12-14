import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MinuteurComponent } from '../minuteur/minuteur.component';
import { ShopComponent } from '../shop/shop.component';
import { GameTimeLeftComponent } from '../game-time-left/game-time-left.component';
import { Cook, DeviceService } from '../../device.service';
import { ThumbnailProfileCuisinierComponent } from '../thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component';
import { NgClass, NgFor } from '@angular/common';
import { ShareDataService } from '../../share-data.service';
import { Timer } from '../minuteur/list-timers-item/list-timers-item.component';
import {
  AssignedTask,
  ListTasksComponent,
} from '../../list-tasks/list-tasks.component';
import { WebSocketService } from '../../websocket.service';
import { DashboardHeaderComponent } from '../../dashboard/dashboard-header/dashboard-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MinuteurComponent,
    ShopComponent,
    GameTimeLeftComponent,
    ThumbnailProfileCuisinierComponent,
    NgClass,
    NgFor,
    ScoreComponent,
    ListTasksComponent,
    DashboardHeaderComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild(GameTimeLeftComponent) clockComponent!: GameTimeLeftComponent;

  isDraggedOver: boolean[] = [false, false, false, false];
  nbEarnedStars: number = 0;
  gameDuration: number = 250; // 250 seconds = 4 minutes and 10 seconds
  private readonly successSound: HTMLAudioElement;
  private readonly finishSound: HTMLAudioElement;
  private readonly backgroundMusic: HTMLAudioElement;
  cooks: Cook[] = [];


  constructor(
    private deviceService: DeviceService,
    private wsService: WebSocketService,
    private shareDataService: ShareDataService
  ) {}

  constructor(
    private readonly router: Router,
    deviceService: DeviceService,
    private readonly shareDataService: ShareDataService,
    private readonly wsService: WebSocketService
  ) {
    this.deviceService = deviceService;
    this.cooks = this.deviceService.getCooks();

    // Initialiser les sons
    this.successSound = new Audio("assets/sounds/success.mp3");
    this.finishSound = new Audio("assets/sounds/finish.mp3");
    this.backgroundMusic = new Audio("assets/sounds/background-music.mp3");

    // Configurer la musique de fond
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Réduire le volume à 30%

    const currentCooks = this.deviceService.getCooks();
    this.sendCooksListToWatch(currentCooks);

    // Subscribe to future changes
    this.deviceService.cooks$.subscribe(cooks => {
      this.cooks = cooks; // Update local property
      this.sendCooksListToWatch(cooks);
    });
  }

  ngOnInit() {
    // Démarrer la musique de fond
    this.backgroundMusic.play().then();

    // Attendre 4s et envoyer un message a Unity
    setTimeout(() => {
      this.wsService.sendMessage({type: 'startGame'});
      this.clockComponent.startTimer();
    }, 1000);
  }

  ngOnDestroy() {
    // Arrêter la musique quand on quitte le composant
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  allowDrop(event: DragEvent, profileNumber: number) {
    event.preventDefault(); // Permet le drop
    this.isDraggedOver[profileNumber] = true;
  }

  dropLeave(event: DragEvent, profileNumber: number) {
    event.preventDefault();
    this.isDraggedOver[profileNumber] = false;
  }

  onDrop(event: DragEvent, profileNumber: number, cook: Cook) {
    event.preventDefault();
    this.isDraggedOver[profileNumber] = false;

    if (event.dataTransfer) {
      const data = event.dataTransfer.getData('text/plain'); // Récupère les données transférées
      let splitData: string[] = data.split('/');
      if (splitData[0] === 'timer') {
        // a timer has been asigned to a cook
        this.assignTimerToCook(splitData[1], cook);
      } else if (splitData[0] === 'task') {
        this.assignTaskToCook(splitData[1], cook);
      }
    }
  }

  assignTimerToCook(timerData: string, cook: Cook) {
    const seconds = timerData.substring(0, 2);
    const timerTimeInSeconds = parseInt(seconds);
    this.sendTimerOfCookToTimersList(timerTimeInSeconds, cook);
  }

  sendTimerOfCookToTimersList(timerTimeInSeconds: number, cook: Cook) {
    const timer: Timer = { timerDuration: timerTimeInSeconds, cook: cook };
    let shareDataServiceData: ShareDataServiceDataObject = {
      object: timer,
      dataType: ShareDataServiceTypes.ASSIGNED_TIMER,
    };
    this.shareDataService.sendData(shareDataServiceData);
  }

  assignTaskToCook(taskName: string, cook: Cook) {
    this.sendCookToAssignedCookOfTask(taskName, cook);
  }

  sendCookToAssignedCookOfTask(taskName: string, cook: Cook) {
    const assignedTask: AssignedTask = { taskName: taskName, cook: cook };
    let shareDataServiceData: ShareDataServiceDataObject = {
      object: assignedTask,
      dataType: ShareDataServiceTypes.ASSIGNED_TASK,
    };
    this.shareDataService.sendData(shareDataServiceData);
  }

  async sendCooksListToWatch(cooks: Cook[]) {
    if (cooks) {
      console.log('Sending cooks list to watch : ', cooks);
      this.wsService.sendMessage({
        from: 'angular',
        to: 'allWatches',
        type: 'cooksList',
        cooksList: cooks
      });
    }
  }

  // TODO nice to have : not use shareDataService anymore for this but @Input with a list instead


  onTimeEnd() {
    // Arrêter la musique de fond avant de jouer le son de fin
    this.backgroundMusic.pause();

    // Jouer le son de fin
    this.finishSound.play().then();

    // Calculer le score final
    const finalScore = {
      nbBurgers: 1, // TODO get from burgers
      totalTime: this.clockComponent.currentTime,
      totalStars: this.nbEarnedStars
    };

    // Naviguer vers la page de fin avec les données
    this.router.navigate(['/finish'], {
      state: { score: finalScore }
    }).then();
  }

  stopTimer() {
    this.clockComponent.stopTimer();
  }

  getTableWidth(): string {
    const profileWidth = 180; // Largeur d'un profil en px
    const gap = 25; // Gap entre les profils en px
    const totalWidth =
      this.cooks.length * profileWidth + (this.cooks.length - 1) * gap;
    return `${totalWidth}px`;
  }

  allowDropOnTable(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('drag-over');
  }

  dropLeaveTable(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('drag-over');
  }

  onDropOnTable(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('drag-over');

    if (event.dataTransfer) {
      const data = event.dataTransfer.getData('text/plain');
      const [type, taskName] = data.split('/');

      if (type === 'task') {
        this.wsService.sendMessage({
          type: 'table_task',
          task: taskName,
          from: 'angular',
          to: 'table',
        });
      }
    }
  }

  // TODO nice to have : not use shareDataService anymore for this but @Input with a list instead
}

export interface ShareDataServiceDataObject {
  object: AssignedTask | Timer;
  dataType: ShareDataServiceTypes;
}

export enum ShareDataServiceTypes {
  ASSIGNED_TIMER,
  ASSIGNED_TASK
}
