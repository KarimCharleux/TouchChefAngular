import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ZXingScannerModule,
    ToastModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanQrComponent {
  scannerEnabled = true;
  availableCameras: MediaDeviceInfo[] = [];
  currentCamera: MediaDeviceInfo | undefined;
  showNameDialog = false;
  currentDeviceId = '';
  cookName = '';
  selectedAvatar = 1;

  constructor(
    protected messageService: MessageService,
    protected deviceService: DeviceService,
    private readonly router: Router
  ) {}

  onCodeResult(resultString: string) {
    if (this.isValidDeviceFormat(resultString)) {
      if (
        this.deviceService
          .getCooks()
          .some((cook) => cook.deviceId === resultString)
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Attention',
          detail: 'Ce QR code a déjà été scanné!',
        });
        return;
      }

      this.currentDeviceId = resultString;
      this.showNameDialog = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'QR code invalide!',
      });
    }
  }

  addCook() {
    if (this.cookName.trim() && this.selectedAvatar) {
      const added = this.deviceService.addCook({
        name: this.cookName,
        deviceId: this.currentDeviceId,
        avatar: this.selectedAvatar.toString(),
      });

      if (added) {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${this.cookName} a été ajouté comme cuisinier!`,
        });

        this.showNameDialog = false;
        this.cookName = '';
        this.selectedAvatar = 1;

        if (
          this.deviceService.getCooks().length >=
          this.deviceService.getNbPlayers()
        ) {
          this.scannerEnabled = false;
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Tous les cuisiniers ont été ajoutés!',
          });
        }
      }
    }
  }

  onCamerasFound(cameras: MediaDeviceInfo[]): void {
    this.availableCameras = cameras;
    const backCamera = cameras.find((camera) =>
      camera.label.toLowerCase().includes('back')
    );
    this.currentCamera = backCamera || cameras[0];
  }

  onCameraChange(deviceId: string): void {
    this.currentCamera = this.availableCameras.find(
      (camera) => camera.deviceId === deviceId
    );
  }

  private isValidDeviceFormat(code: string): boolean {
    // Vérifier si le format correspond à "Model-AndroidID"
    return /^[\w-]+-[\w-]+$/.test(code);
  }

  getPlayerSlots(): number[] {
    return Array(this.deviceService.getNbPlayers()).fill(0);
  }

  selectAvatar(avatarNumber: number) {
    this.selectedAvatar = avatarNumber;
  }

  showTutorial() {
    this.router.navigate(['/tutorial']);
  }

  skipTutorial() {
    this.router.navigate(['/dashboard']);
  }
}
