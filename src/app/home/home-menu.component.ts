import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {UntilDestroy} from '@ngneat/until-destroy';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    ToastModule,
  ],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss',
  providers: [MessageService]
})
@UntilDestroy()
export class HomeMenuComponent implements OnInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  protected counterStatus: 'normal' | 'max' | 'min' = 'min';
  protected readonly maxNbPlayers: number = 4;
  protected readonly minNbPlayers: number = 1;
  protected currentNbPlayer: number = this.minNbPlayers;

  constructor(private readonly router: Router) {}
 
  ngOnInit() {
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
    this.router.navigate(['/tutorial']).then();
  }
}
