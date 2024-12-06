import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MinuteurComponent} from '../minuteur/minuteur.component';
import {ShopComponent} from '../shop/shop.component';
import {GameTimeLeftComponent} from '../game-time-left/game-time-left.component';
import {ScoreComponent} from '../score/score.component';
import {Cook, DeviceService} from '../../device.service';
import {ThumbnailProfileCuisinierComponent} from '../thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component';
import {NgClass} from '@angular/common';
import {ShareDataService} from '../../share-data.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MinuteurComponent,
    ShopComponent,
    GameTimeLeftComponent,
    ScoreComponent,
    ThumbnailProfileCuisinierComponent,
    NgClass
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

  deviceService?: DeviceService = undefined;
  isDraggedOver = false;

  @Input() cooks: Cook[] = [];

  constructor(deviceService: DeviceService, private shareDataService: ShareDataService) {
    this.deviceService = deviceService;
    this.deviceService.addCook({'name': "Damien", 'deviceId': "1", 'avatar': "3"});
    this.deviceService.addCook({'name': "Karim", 'deviceId': "2", 'avatar': "1"});
    this.deviceService.addCook({'name': "Anas", 'deviceId': "3", 'avatar': "4"});
    this.deviceService.addCook({'name': "Saad", 'deviceId': "4", 'avatar': "2"});
    this.cooks = this.deviceService.getCooks();
  }

  allowDrop(event: DragEvent) {
    event.preventDefault(); // Permet le drop
    this.isDraggedOver = true;
  }

  dropLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggedOver = false;
  }

  onDrop(event: DragEvent, cook: Cook) {
    event.preventDefault();
    this.isDraggedOver = false;

    if (event.dataTransfer) {
      const timerData = event.dataTransfer.getData('text/plain'); // Récupère les données transférées
      if (timerData) {
        this.assignTimerToCook(timerData, cook);
      }
    }
  }

  assignTimerToCook(timerData: string, cook: Cook) {
    const minutes = timerData.substring(0, 2);
    const seconds = timerData.substring(2, 4);
    const timerTimeInSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
    this.sendTimerOfCookToTimersList(timerTimeInSeconds, cook);
  }

  sendTimerOfCookToTimersList(timerTimeInSeconds: number, cook: Cook) {
    const timer = {"timerTime": timerTimeInSeconds, "cook": cook};
    this.shareDataService.sendData(timer);
  }
}
