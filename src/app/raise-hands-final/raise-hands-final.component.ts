import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {
  ThumbnailProfileCuisinierComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component";
import {Cook, DeviceService} from "../device.service";
import {
  PlayerDataValueComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/player-data-value/player-data-value.component";
import {Subscription} from "rxjs";
import {RaiseHandsFinalWebSocketService} from './raise-hands-final-websocket.service';

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
export class RaiseHandsFinalComponent implements OnDestroy {

  @Output() allHandsRaised = new EventEmitter<void>();

  @Input() cooks: Cook[] = [];

  raised: boolean[] = [];
  vibration: number[][] = [[100,200,200], [400, 300, 400], [500, 100, 300], [200, 100, 400]]
  private raisedSubscription: Subscription[] = [];

  constructor(private raiseHandsWsService: RaiseHandsFinalWebSocketService, private deviceService: DeviceService, private cdr: ChangeDetectorRef) {
    this.cooks = this.deviceService.getCooks();
    this.setupRaisedTracking(this.cooks.length);
  }

  isVibrationSupported(): boolean {
    return 'vibrate' in navigator;
  }

  vibrateDevice(pattern: number | number[]): void {
    if (this.isVibrationSupported()) {
      navigator.vibrate(pattern);
    } else {
      console.warn('L\'API Vibration n\'est pas prise en charge sur cet appareil.');
    }
  }

  setupRaisedTracking(nbCooks: number) {
    for (let i = 0; i < nbCooks; i++) {
      this.raised.push(false);
    }

    this.raisedSubscription = this.cooks.map((cook, index) => {
      return this.raiseHandsWsService
        .listenToHandRaise(cook)
        .subscribe(() => {
          this.raised[index] = true;
          this.vibrateDevice(this.vibration[index]); // TODO : assigner une vibration différente aux cuisiniers selon leur efficacité par exemple
          this.cdr.detectChanges();
          this.checkAllRaised();
        });
    });
  }

  checkAllRaised() {
    if (this.raised.every(status => status)) {
      this.allHandsRaised.emit();
    }
  }

  raiseByClick(index: number) {
    this.raised[index] = true;
    this.checkAllRaised();
  }

  ngOnDestroy() {
    this.raisedSubscription?.forEach(sub => sub?.unsubscribe());
  }


}
