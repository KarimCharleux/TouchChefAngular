import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {WebSocketService} from '../websocket.service';

@Component({
  selector: 'app-stars',
  standalone: true,
  template: `
    <div class="flex flex-row bg-white px-5 py-3 h-fit justify-between w-fit items-center rounded-xl gap-3">
      <span class="text-star-color font-bold text-center text-2xl">{{
          nbEarnedStars
        }}</span>
      <img src="assets/star.png" alt="star" class="w-6"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsComponent {
  @Input() nbEarnedStars: number = 0;

  constructor(private wsService: WebSocketService, private cdr: ChangeDetectorRef) {
    this.setupScoreUpdateTracking();
  }

  setupScoreUpdateTracking() {
    let msg: string = "";

    this.wsService
      .waitMessage(msg)
      .subscribe(message => {
        const scoreUpdateMessage = message as {
          type: string,
          from: string,
          to: string,
          points: number
        };
        if (scoreUpdateMessage.type === "updateScore") {
          const points: number = scoreUpdateMessage.points;
          this.updateScore(points);
        }
      });
  }

  updateScore(points: number) {
    this.nbEarnedStars = Number(this.nbEarnedStars) + Number(points);
    this.cdr.detectChanges();
  }
}
