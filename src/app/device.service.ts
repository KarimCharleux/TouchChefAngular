import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ScannedDevice {
  id: string;
  timestamp: Date;
}

export interface Cook {
  name: string;
  deviceId: string;
  avatar: string;
  color: string;
}

export interface CookColor {
  name: string;
  value: string;
  isSelected: boolean;
}

export const COOK_COLORS = {
  RED: '#dc4363',
  BLUE: '#63b2ff',
  GREEN: '#32cc73',
  YELLOW: '#ffd900'
};

const mockCooks: Cook[] = [
  { name: 'Karim', deviceId: '1', avatar: '1', color: COOK_COLORS.RED },
  { name: 'Anas', deviceId: '2', avatar: '2', color: COOK_COLORS.BLUE },
  { name: 'Damien', deviceId: '3', avatar: '3', color: COOK_COLORS.GREEN },
  { name: 'Saad', deviceId: '4', avatar: '4', color: COOK_COLORS.YELLOW }
];

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private nbPlayers: number = 1;
  protected scannedDevices = new BehaviorSubject<ScannedDevice[]>([]);
  scannedDevices$ = this.scannedDevices.asObservable();
  protected cooks = new BehaviorSubject<Cook[]>([]);
  cooks$ = this.cooks.asObservable();

  addDevice(deviceId: string) {
    const currentDevices = this.scannedDevices.value;
    // Vérifier si l'appareil existe déjà
    if (!currentDevices.some(device => device.id === deviceId)) {
      currentDevices.push({
        id: deviceId,
        timestamp: new Date()
      });
      this.scannedDevices.next(currentDevices);
      return true;
    }
    return false;
  }

  getDeviceCount(): number {
    return this.scannedDevices.value.length;
  }

  clearDevices() {
    this.scannedDevices.next([]);
  }

  setNbPlayers(nb: number) {
    this.nbPlayers = nb;
  }

  getNbPlayers(): number {
    return this.nbPlayers;
  }

  addCook(cook: Cook): boolean {
    const currentCooks = this.cooks.value;
    if (!currentCooks.some(c => c.deviceId === cook.deviceId)) {
      currentCooks.push(cook);
      this.cooks.next(currentCooks);
      return true;
    }
    return false;
  }

  getCooks(): Cook[] {
    return mockCooks; // TODO: this.cooks.value;
  }

  clearCooks() {
    this.cooks.next([]);
  }
}
