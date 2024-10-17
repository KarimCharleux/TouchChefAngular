import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss'
})
export class HomeMenuComponent {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

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
}
