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

    this.wsService
      .waitMessage()
      .subscribe(message => {
        const scoreUpdateMessage = message as {
          type: string,
          from: string,
          to: string,
          ingredientState: string
        };
        if (scoreUpdateMessage.type === "updatescore") {
          // Vérifier si l'état est valide
          const ingredientStateKey = Object.keys(IngredientState).find(key => IngredientState[key as keyof typeof IngredientState] === scoreUpdateMessage.ingredientState);

          if (ingredientStateKey) {
            // Transformer en type enum IngredientState
            const ingredientState = IngredientState[ingredientStateKey as keyof typeof IngredientState];

            // Obtenir les points associés
            const points = IngredientStatePoints[ingredientStateKey as keyof typeof IngredientStatePoints];
            this.updateScore(points);
          } else {
            console.error("Invalid ingredientState received:", scoreUpdateMessage.ingredientState);
          }
        }
      });
  }

  updateScore(points: number) {
    this.nbEarnedStars = Number(this.nbEarnedStars) + Number(points);
    this.cdr.detectChanges();
  }
}

export enum IngredientState {
  COOKED_STEAK = "cookedState",
  CUT_TOMATO = "cutTomato",
  CUT_STEAK = "cutSteak",
  CUT_LETTUCE = "cutLettuce",
  WASHED_LETTUCE = "washedLettuce",
  CUT_CHEESE = "cutCheese"
}

export enum IngredientStatePoints {
  COOKED_STEAK = 2,
  CUT_TOMATO = 1,
  CUT_LETTUCE = 3,
  WASHED_LETTUCE = 2,
  CUT_CHEESE = 4,
  CUT_STEAK = 1
}
