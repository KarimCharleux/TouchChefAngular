import { ChangeDetectionStrategy, Component } from '@angular/core';
import {WebSocketService} from '../websocket.service';

@Component({
  selector: 'app-raise-hands-final',
  standalone: true,
  imports: [],
  templateUrl: './raise-hands-final.component.html',
  styleUrl: './raise-hands-final.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaiseHandsFinalComponent {
  raised: string[] = [];

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    /*
    this.handRaiseService.getHandRaiseMessages().subscribe(player => {
      if (!this.players.includes(player)) {
        this.players.push(player);
      }
    });*/
  }
}
