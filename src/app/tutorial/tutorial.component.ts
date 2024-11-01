import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent implements OnInit, AfterViewInit {
  @ViewChild('tutorialVideo') videoElement!: ElementRef<HTMLVideoElement>;
  showPlayButton = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Si vous voulez être sûr que la vidéo se lance en plein écran sur mobile
    document.documentElement.requestFullscreen?.().then();
    // Mettre le son
    this.videoElement.nativeElement.muted = false;
  }

  ngAfterViewInit() {
    if (this.videoElement?.nativeElement) {
      // Démarrer la vidéo automatiquement
      this.videoElement.nativeElement.play().then();

      // Écouter la fin de la vidéo
      this.videoElement.nativeElement.onended = () => {
        this.showPlayButton = true;
        // Animation d'apparition du bouton
        setTimeout(() => {
          const button = document.querySelector('.play-button');
          button?.classList.add('visible');
        }, 100);
      };
    }
  }

  startGame() {
    this.router.navigate(['/game']).then();
    // TODO Send websocket message to unity
  }
}
