import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-list-steps-to-do',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './list-steps-to-do.component.html',
  styleUrl: './list-steps-to-do.component.css'
})
export class ListStepsToDoComponent {

  $dishToPrepare: string = "";

}
