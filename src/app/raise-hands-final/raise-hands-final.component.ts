import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WebSocketService} from '../websocket.service';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {
    ThumbnailProfileCuisinierComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component";
import {Cook, DeviceService} from "../device.service";
import {
    PlayerDataValueComponent
} from "../main-chef-cuisinier/thumbnail-profile-cuisinier/player-data-value/player-data-value.component";

@Component({
    selector: 'app-raise-hands-final',
    standalone: true,
    imports: [
        NgForOf,
        ThumbnailProfileCuisinierComponent,
        NgOptimizedImage,
        PlayerDataValueComponent
    ],
    templateUrl: './raise-hands-final.component.html',
    styleUrl: './raise-hands-final.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaiseHandsFinalComponent {

    @Input() cooks: Cook[] = [];

    raised: string[] = [];

    constructor(private wsService: WebSocketService, private deviceService: DeviceService) {
        this.cooks = this.deviceService.getCooks();
    }

    ngOnInit(): void {
        /*
        this.handRaiseService.getHandRaiseMessages().subscribe(player => {
          if (!this.players.includes(player)) {
            this.players.push(player);
          }
        });*/
    }
}
