import { ChangeDetectionStrategy, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { DashboardClockComponent, TimerStatus } from "./dashboard-clock/dashboard-clock.component";
import { NgIf, NgFor } from '@angular/common';
import { BURGERS } from './burgers.data';
import { Burger } from './burger.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { ListTasksComponent } from "../list-tasks/list-tasks.component";
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommentPanelComponent } from './comment-panel/comment-panel.component';
import { WebSocketService } from '../websocket.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CountdownComponent,
    DashboardHeaderComponent,
    DashboardClockComponent,
    NgIf,
    NgFor,
    OverlayPanelModule,
    ProgressBarComponent,
    ListTasksComponent,
    DialogModule,
    CommentPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(DashboardClockComponent) clockComponent!: DashboardClockComponent;
  @ViewChild(ListTasksComponent) listTasksComponent!: ListTasksComponent;
  
  earnedStars: number = 0; // Nombre d'étoiles gagnées
  currentStatus: TimerStatus = 'ready'; // Statut du timer
  currentTime: number = 0;
  durationTime: number = 5 * 60; // C'est le temps d'une partie (5 minutes)
  burgers: Burger[] = BURGERS; // Liste des burgers
  selectedBurger: Burger = this.burgers[0]; // Par défaut, sélectionne le premier burger
  progress: number = 0; // Progression du burger
  showCommentDialog: boolean = false;
  currentComment = CommentPanelComponent.getRandomComment();
  private readonly successSound: HTMLAudioElement;
  private readonly finishSound: HTMLAudioElement;
  private readonly backgroundMusic: HTMLAudioElement;
  
  constructor(private readonly router: Router, private readonly websocketService: WebSocketService) {
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
      this.websocketService.sendMessage({type: 'startGame'});
    }, 4000);
  }

  ngOnDestroy() {
    // Arrêter la musique quand on quitte le composant
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  selectBurger(burger: Burger) {
    this.selectedBurger = burger;
  }

  onStatusChange(status: TimerStatus) {
    this.currentStatus = status;
  }

  onTimeChange(time: number) {
    this.currentTime = time;
  }

  startTimer() {
    this.clockComponent.start();
  }

  stopTimer() {
    this.clockComponent.stop();
  }

  resetTimer() {
    this.clockComponent.reset();
  }

  updateProgress(progress: number) {
    this.progress = progress;
  }

  onCountdownComplete() {
    this.startTimer();
  }

  nextBurger() {
    const currentIndex = this.burgers.findIndex(burger => burger.id === this.selectedBurger.id);
    
    // Si c'est le dernier burger, arrêter la musique avant le son de fin
    if (currentIndex === this.burgers.length - 1) {
      this.backgroundMusic.pause();
      this.finishSound.play().then();
      this.stopTimer();
    } else {
      this.successSound.play().then();
    }
    
    // Réinitialiser la progression et les tâches cochées
    this.progress = 0;
    this.listTasksComponent.checkedTasks.clear();
    
    // Afficher la modal de commentaire et ajouter les étoiles au total
    this.currentComment = CommentPanelComponent.getRandomComment();
    this.earnedStars += this.currentComment.nbStars;
    this.showCommentDialog = true;
    
    // Si c'est le dernier burger, terminer la partie
    if (currentIndex === this.burgers.length - 1) {
      const finalScore = {
        nbBurgers: this.burgers.length,
        totalTime: this.currentTime,
        totalStars: this.earnedStars
      };
      
      // Attendre que l'utilisateur ferme la modal avant de naviguer
      setTimeout(() => {
        this.router.navigate(['/finish'], { 
          state: { score: finalScore }
        }).then();
      }, 2000);
    } else {
      // Sinon, passer au burger suivant
      this.selectedBurger = this.burgers[currentIndex + 1];
    }
  }

  onTimeEnd() {
    // Arrêter la musique de fond avant de jouer le son de fin
    this.backgroundMusic.pause();
    
    // Arrêter le timer
    this.stopTimer();
    
    // Jouer le son de fin
    this.finishSound.play().then();
    
    // Calculer le score final
    const finalScore = {
      nbBurgers: this.burgers.findIndex(burger => burger.id === this.selectedBurger.id),
      totalTime: this.currentTime,
      totalStars: this.earnedStars
    };
    
    // Naviguer vers la page de fin avec les données
    this.router.navigate(['/finish'], { 
      state: { score: finalScore }
    }).then();
  }
}
