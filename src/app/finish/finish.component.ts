import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

interface Score {
  nbBurgers: number;
  totalTime: number;
  totalStars: number;
}

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [NgIf],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent implements OnInit {
  score: Score | null = null;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    if (history.state && history.state.score) {
      this.score = history.state.score;
    } else {
      console.log('No score found in state');
    }
  }

  backToMenu() {
    this.router.navigate(['/']).then();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
