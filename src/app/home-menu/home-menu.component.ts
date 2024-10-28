import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from '../websocket.service';
import {Subscription} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss'
})
@UntilDestroy()
export class HomeMenuComponent implements OnInit, OnDestroy {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  protected counterStatus: 'normal' | 'max' | 'min' = 'min';
  protected readonly maxNbPlayers: number = 4;
  protected readonly minNbPlayers: number = 1;
  protected currentNbPlayer: number = this.minNbPlayers;

  private subscription: Subscription | undefined;


  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.subscription = this.webSocketService.getMessages().pipe(untilDestroyed(this)).subscribe(
      message => {
        console.log('Message reçu:', message);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onLoadedData() {
    this.backgroundVideo?.nativeElement.play()
      .then()
      .catch(() => {
        setTimeout(() => this.onLoadedData(), 1000);
      });
  }

  onVideoWaiting() {
    this.backgroundVideo.nativeElement.play()
      .then()
      .catch(() => {
        setTimeout(() => this.onVideoWaiting(), 1000);
      });
  }

  decreaseNbPlayersByOne(): void {
    if (this.currentNbPlayer <= this.minNbPlayers) {
      this.counterStatus = 'min';
      return;
    }
    this.currentNbPlayer -= 1;
    this.counterStatus = this.currentNbPlayer === this.minNbPlayers ? 'min' : 'normal';
  }

  increaseNbPlayersByOne(): void {
    if (this.currentNbPlayer >= this.maxNbPlayers) {
      this.counterStatus = 'max';
      return;
    }
    this.currentNbPlayer += 1;
    this.counterStatus = this.currentNbPlayer === this.maxNbPlayers ? 'max' : 'normal';
  }

  startGame() {
    this.webSocketService.sendMessage("allloooo");
  }
}
