import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {

  @Input() progress: number = 0;

  async ngOnInit() {
    // S'assure que la valeur est entre 0 et 100
    this.progress = Math.min(100, Math.max(0, this.progress));
    while(this.progress<100){
      this.progress +=1;
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }





}
