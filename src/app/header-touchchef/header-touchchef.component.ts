import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header-touchchef',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header-touchchef.component.html',
  styleUrl: './header-touchchef.component.css'
})
export class HeaderTouchchefComponent {

  @Input() showEarnedStars: boolean = false;
  @Input() showStopGameButton: boolean = false;
  @Input() $nbEarnedStars: number = 15;

}
