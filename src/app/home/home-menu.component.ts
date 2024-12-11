import {Component, ElementRef, ViewChild} from '@angular/core';
import {UntilDestroy} from '@ngneat/until-destroy';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Router} from '@angular/router';
import {DeviceService} from '../device.service';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [NgOptimizedImage, NgClass, ToastModule],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss',
  providers: [MessageService],
})
@UntilDestroy()
export class HomeMenuComponent {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  protected counterStatus: 'normal' | 'max' | 'min' = 'min';
  protected readonly maxNbPlayers: number = 4;
  protected readonly minNbPlayers: number = 1;
  protected currentNbPlayer: number = this.minNbPlayers;

  constructor(
    private readonly wsService: WebSocketService,
    private readonly router: Router,
    private readonly deviceService: DeviceService
  ) {
  }

  onLoadedData() {
    this.backgroundVideo?.nativeElement
      .play()
      .then()
      .catch(() => {
        setTimeout(() => this.onLoadedData(), 1000);
      });
  }

  onVideoWaiting() {
    this.backgroundVideo.nativeElement
      .play()
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
    this.deviceService.setNbPlayers(this.currentNbPlayer);
    this.router.navigate(['/scan-qr']).then();
  }
}
