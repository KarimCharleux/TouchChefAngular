import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
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

    @Input() cooks: Cook[] = [];

    raised: boolean[] = [false, false, false, false];
    private raisedSubscription: Subscription[] = [];

    constructor(private wsService: WebSocketService, private deviceService: DeviceService, private cdr: ChangeDetectorRef) {
        this.cooks = this.deviceService.getCooks();
        this.setupRaisedTracking();
    }

    setupRaisedTracking() {
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
                    }
                });
        });
    }

    ngOnDestroy() {
        // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
        //this.raisedSubscription.for(sub => sub.unsubscribe());
    }
}
