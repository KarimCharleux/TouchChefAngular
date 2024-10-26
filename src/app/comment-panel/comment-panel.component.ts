import {Component} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-comment-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './comment-panel.component.html',
  styleUrl: './comment-panel.component.css'
})
export class CommentPanelComponent {

  $commentContent: string = "La pizza est trop cuite j'ai jamais vu ça !";
  $nbStars: number = 3;
  $maxNbStars: number = 5;

}
