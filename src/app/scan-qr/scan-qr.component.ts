import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { COOK_COLORS, CookColor, DeviceService } from '../device.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket.service';
import { firstValueFrom } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


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
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanQrComponent implements OnInit {
  scannerEnabled = true;
  availableCameras: MediaDeviceInfo[] = [];
  currentCamera: MediaDeviceInfo | undefined;
  showNameDialog = false;
  currentDeviceId = '';
  cookName = '';
  selectedAvatar = 1;
  isWaitingResponse = false;
  hasPermission = false;
  showPermissionDialog = false;
  selectedColor: string = '';
  availableColors: CookColor[] = [
    { name: 'Rouge', value: COOK_COLORS.RED, isSelected: false },
    { name: 'Bleu', value: COOK_COLORS.BLUE, isSelected: false },
    { name: 'Vert', value: COOK_COLORS.GREEN, isSelected: false },
    { name: 'Jaune', value: COOK_COLORS.YELLOW, isSelected: false }
  ];

  constructor(
    protected messageService: MessageService,
    protected deviceService: DeviceService,
    protected wsService: WebSocketService,
    private readonly router: Router
  ) {
  }

  async ngOnInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasPermission = true;
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      this.showPermissionDialog = true;
      alert('Permission denied');
    }
  }

  async requestPermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasPermission = true;
      this.showPermissionDialog = false;
      this.scannerEnabled = true;
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible d\'accéder à la caméra. Veuillez vérifier les permissions dans les paramètres de votre navigateur.',
      });
    }
  }

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

  async addCook() {
    if (!this.cookName.trim() || !this.selectedAvatar || !this.selectedColor) return;

    this.isWaitingResponse = true;

    try {
      this.wsService.sendMessage({
        from: 'angular',
        to: this.currentDeviceId,
        type: 'addCook',
        name: this.cookName,
        avatar: this.selectedAvatar.toString(),
      });

      console.log('Message envoyé');


      const response = await Promise.race([
        firstValueFrom(this.wsService.waitMessage('{"type":"confirmation","to":"angular","from":"' + this.currentDeviceId + '"}')),
        new Promise((_, reject) => 
          setTimeout(() => reject('timeout'), 1000)
        )
      ]);

      console.log('Response:', response);


      const added = this.deviceService.addCook({
        name: this.cookName,
        deviceId: this.currentDeviceId,
        avatar: this.selectedAvatar.toString(),
        color: this.selectedColor
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

        const colorIndex = this.availableColors.findIndex(c => c.value === this.selectedColor);
        if (colorIndex !== -1) {
          this.availableColors[colorIndex].isSelected = true;
        }

        this.selectedColor = '';
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de connexion',
        detail: 'Veuillez vérifier que la montre de ' + this.cookName + ' est bien connectée au réseau WiFi',
      });
    } finally {
      this.isWaitingResponse = false;
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
    return true;
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
    this.router.navigate(['/countdown']);
  }

  selectColor(color: CookColor) {
    if (!color.isSelected) {
      this.selectedColor = color.value;
    }
  }
}
