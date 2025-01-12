import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from '../../timer/timer.component';
import {ShopComponent} from '../shop/shop.component';
import {GameTimeLeftComponent} from '../game-time-left/game-time-left.component';
import {Cook, DeviceService} from '../../device.service';
import {ThumbnailProfileCuisinierComponent} from '../thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {ListTasksComponent} from '../../task/list-tasks/list-tasks.component';
import {DashboardHeaderComponent} from '../../dashboard/dashboard-header/dashboard-header.component';
import {Router} from '@angular/router';
import {RaiseHandsFinalComponent} from '../../raise-hands-final/raise-hands-final.component';
import {TaskService} from '../../task/task.service';
import {TimerService} from '../../timer/timer.service';
import {DataTransferType} from '../../enums/dataTransferTypeEnum';
import {MainPageWebSocketService} from './main-page-websocket.service';
import {Task} from '../../dashboard/burger.model';
import {DashboardHeaderWebSocketService} from '../../dashboard/dashboard-header/dashboard-header-websocket.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    TimerComponent,
    ShopComponent,
    GameTimeLeftComponent,
    ThumbnailProfileCuisinierComponent,
    NgClass,
    NgFor,
    ListTasksComponent,
    DashboardHeaderComponent,
    RaiseHandsFinalComponent,
    NgIf,
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
  heartRates: number[] = [];
  showRaiseHandsModal: boolean = false;

  constructor(
    private readonly router: Router,
    private deviceService: DeviceService,
    private taskService: TaskService,
    private mainPageWsService: MainPageWebSocketService,
    private readonly dashboardHeaderWsService: DashboardHeaderWebSocketService,
    private cdr: ChangeDetectorRef,
    private timerService: TimerService
  ) {
    this.cooks = this.deviceService.getCooks();

    // Initialiser les sons
    this.successSound = new Audio("assets/sounds/success.mp3");
    this.finishSound = new Audio("assets/sounds/finish.mp3");
    this.backgroundMusic = new Audio("assets/sounds/background-music.mp3");

    // Configurer la musique de fond
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Réduire le volume à 30%
  }

  ngOnInit() {
    // Démarrer la musique de fond
    this.backgroundMusic.play().then();

    // Attendre 4s et envoyer un message a Unity
    setTimeout(() => {
      this.mainPageWsService.sendMessageStartGame();
      this.clockComponent.startTimer();
    }, 1000);

    this.cooks.forEach((cook, index) => {
      this.mainPageWsService.getBPMOfCook(cook.deviceId).subscribe(bpm => {
        this.heartRates[index] = bpm;
        this.cdr.detectChanges();
      });
    });
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
      const data = event.dataTransfer.getData('text/plain');
      const [type, field] = data.split('/');

      if (DataTransferType.isTimer(type)) {
        this.assignTimerToCook(field, cook); // Get duration timer
      } else if (DataTransferType.isTask(type)) {
        this.assignTaskToCook(field, cook); // Get taskId
      }
    }
  }

  assignTaskToCook(taskId: string, cook: Cook) {
    // Vérifie si la tâche existe dans la liste des tâches courantes
    const task = this.taskService.getCurrentTasks().find(t => t.id === taskId);
    if (task) {
      this.taskService.assignTask(taskId, cook); // Assigne la tâche à un cuisinier
    } else {
      console.error("Impossible d'assigner la tâche à " + cook.deviceId + " car la tâche n'existe pas. TaskId : " + taskId);
    }
  }

  assignTimerToCook(timerDuration: string, cook: Cook) {
    const duration = parseInt(timerDuration);
    this.timerService.assignTimerToCook(duration, cook);
  }

  onTimeEnd() {
    // Arrêter la musique de fond avant de jouer le son de fin
    this.backgroundMusic.pause();

    // Jouer le son de fin
    this.finishSound.play().then();

    this.showRaiseHandsModal = true;

    // Calculer le score final
    const finalScore = {
      nbBurgers: 1, // TODO get from burgers
      totalTime: this.clockComponent.currentTime,
      totalStars: this.nbEarnedStars
    };
  }

  stopTimer() {
    this.clockComponent.stopTimer();
  }

  unableModale() {
    this.showRaiseHandsModal = false;
    this.cdr.detectChanges();

    const finalScore = {
      nbBurgers: 1, // TODO get from burgers
      totalTime: this.gameDuration - this.clockComponent.currentTime,
      totalStars: this.nbEarnedStars
    };

    this.dashboardHeaderWsService.sendStopGame();
    // Naviguer vers la page de fin avec les données
    this.router.navigate(['/finish'], {
      state: {score: finalScore}
    }).then();
  }

  getTableWidth(): string {
    const profileWidth = 180; // Largeur d'un profil en px
    const gap = 12; // Gap entre les profils en px
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
      const [type, field] = data.split('/');

      if (DataTransferType.isTask(type)) {
        const task: Task | undefined = this.taskService.getTaskById(field);
        if (task) {
          this.mainPageWsService.sendTaskToTable(task);
        } else {
          console.error("Task cannot be sent to table because task with ID :" + field + " is not found");
        }
      }
    }
  }

  getNumberOfAssignedUncompletedTasksOfCook(cook: Cook) {
    return this.taskService.getNumberOfAssignedUncompletedTasksOfCook(cook);
  }
}
