import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  template: `
    <div class="flex flex-row bg-white px-5 py-3 h-fit justify-between w-fit items-center rounded-xl gap-3">
      <span class="text-star-color font-bold text-center text-2xl">{{
        nbEarnedStars
      }}</span>
      <img src="assets/star.png" alt="star" class="w-6" />
    </div>
  `,  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsComponent {
  @Input() nbEarnedStars: number = 0;
}
