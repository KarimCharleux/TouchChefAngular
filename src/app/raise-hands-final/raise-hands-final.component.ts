import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {WebSocketService} from '../websocket.service';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {
  ThumbnailProfileCuisinierComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component";
import {Cook, DeviceService} from "../device.service";
import {
  PlayerDataValueComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/player-data-value/player-data-value.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-raise-hands-final',
  standalone: true,
  imports: [
    NgForOf,
    ThumbnailProfileCuisinierComponent,
    NgOptimizedImage,
    PlayerDataValueComponent,
    NgClass
  ],
  templateUrl: './raise-hands-final.component.html',
  styleUrl: './raise-hands-final.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaiseHandsFinalComponent {

  @Output() allHandsRaised = new EventEmitter<void>();

  @Input() cooks: Cook[] = [];

  raised: boolean[] = [];
  private raisedSubscription: Subscription[] = [];

  constructor(private wsService: WebSocketService, private deviceService: DeviceService, private cdr: ChangeDetectorRef) {
    this.cooks = this.deviceService.getCooks();
    this.setupRaisedTracking(this.cooks.length);
  }

  setupRaisedTracking(nbCooks: number) {
    for (let i = 0; i < nbCooks; i++) {
      this.raised.push(false);
    }

    this.raisedSubscription = this.cooks.map((cook, index) => {
      return this.wsService
        .waitMessage("")
        .subscribe(message => {
          const raisedMessage = message as {
            type: string,
            from: string,
            deviceId: string,
            raised: boolean
          };

          if (raisedMessage.type === "playerRaised" && raisedMessage.deviceId === cook.deviceId) {
            this.raised[index] = raisedMessage.raised;
            this.cdr.detectChanges();
            this.checkAllRaised();
          }
        });
    });
  }

  checkAllRaised() {
    if (this.raised.every(status => status === true)) {
      this.allHandsRaised.emit();
    }
  }

  ngOnDestroy() {
    // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
    //this.raisedSubscription.for(sub => sub.unsubscribe());
  }


}
