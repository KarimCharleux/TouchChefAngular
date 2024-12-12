import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MinuteurComponent} from '../minuteur/minuteur.component';
import {ShopComponent} from '../shop/shop.component';
import {GameTimeLeftComponent} from '../game-time-left/game-time-left.component';
import {ScoreComponent} from '../score/score.component';
import {Cook, DeviceService} from '../../device.service';
import {ThumbnailProfileCuisinierComponent} from '../thumbnail-profile-cuisinier/thumbnail-profile-cuisinier.component';
import {NgClass} from '@angular/common';
import {ShareDataService} from '../../share-data.service';
import {Timer} from '../minuteur/list-timers-item/list-timers-item.component';
import {AssignedTask, ListTasksComponent} from "../../list-tasks/list-tasks.component";

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [
        MinuteurComponent,
        ShopComponent,
        GameTimeLeftComponent,
        ScoreComponent,
        ThumbnailProfileCuisinierComponent,
        NgClass,
        ListTasksComponent
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

    deviceService?: DeviceService = undefined;
    isDraggedOver: boolean[] = [false, false, false, false];

    @Input() cooks: Cook[] = [];

    constructor(deviceService: DeviceService, private shareDataService: ShareDataService) {
        this.deviceService = deviceService;
        this.cooks = this.deviceService.getCooks();
    }

    allowDrop(event: DragEvent, profileNumber: number) {
        event.preventDefault(); // Permet le drop
        this.isDraggedOver[profileNumber] = true;
    }

    dropLeave(event: DragEvent, profileNumber: number) {
        event.preventDefault();
        this.isDraggedOver[profileNumber] = false;
    }

    onDrop(event: DragEvent, profileNumber: number, cook: Cook) {
        event.preventDefault();
        this.isDraggedOver[profileNumber] = false;

        if (event.dataTransfer) {
            const data = event.dataTransfer.getData('text/plain'); // Récupère les données transférées
            let splitData: string[] = data.split('/');
            if (splitData[0] === "timer") { // a timer has been asigned to a cook
                this.assignTimerToCook(splitData[1], cook);
            } else if (splitData[0] === "task") {
                this.assignTaskToCook(splitData[1], cook);
            }
        }
    }

    assignTimerToCook(timerData: string, cook: Cook) {
        const seconds = timerData.substring(0, 2);
        const timerTimeInSeconds = parseInt(seconds);
        this.sendTimerOfCookToTimersList(timerTimeInSeconds, cook);
    }

    sendTimerOfCookToTimersList(timerTimeInSeconds: number, cook: Cook) {
        const timer: Timer = {timerDuration: timerTimeInSeconds, cook: cook};
        let shareDataServiceData: ShareDataServiceDataObject = {
            object: timer,
            dataType: ShareDataServiceTypes.ASSIGNED_TIMER
        };
        this.shareDataService.sendData(shareDataServiceData);
    }

    assignTaskToCook(taskName: string, cook: Cook) {
        this.sendCookToAssignedCookOfTask(taskName, cook);
    }

    sendCookToAssignedCookOfTask(taskName: string, cook: Cook) {
        const assignedTask: AssignedTask = {taskName: taskName, cook: cook};
        let shareDataServiceData: ShareDataServiceDataObject = {
            object: assignedTask,
            dataType: ShareDataServiceTypes.ASSIGNED_TASK
        };
        this.shareDataService.sendData(shareDataServiceData);
    }

    // TODO nice to have : not use shareDataService anymore for this but @Input with a list instead
}

export interface ShareDataServiceDataObject {
    object: AssignedTask | Timer;
    dataType: ShareDataServiceTypes;
}

export enum ShareDataServiceTypes {
    ASSIGNED_TIMER,
    ASSIGNED_TASK
}
