import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TouchChefAngular';
  ngOnInit() {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  }
}
