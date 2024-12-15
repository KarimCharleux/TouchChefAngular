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

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private nbPlayers: number = 2;
  protected scannedDevices = new BehaviorSubject<ScannedDevice[]>([]);
  scannedDevices$ = this.scannedDevices.asObservable();
  protected cooks = new BehaviorSubject<Cook[]>([]);
  cooks$ = this.cooks.asObservable();

  constructor() {
    // Charger les données du localStorage au démarrage
    const savedCooks = localStorage.getItem('cooks');
    const savedDevices = localStorage.getItem('scannedDevices');
    const savedNbPlayers = localStorage.getItem('nbPlayers');

    if (savedCooks) {
      this.cooks.next(JSON.parse(savedCooks));
    }
    if (savedDevices) {
      this.scannedDevices.next(JSON.parse(savedDevices));
    }
    if (savedNbPlayers) {
      this.nbPlayers = parseInt(savedNbPlayers);
    }
  }

  addDevice(deviceId: string) {
    const currentDevices = this.scannedDevices.value;
    if (!currentDevices.some(device => device.id === deviceId)) {
      currentDevices.push({
        id: deviceId,
        timestamp: new Date()
      });
      this.scannedDevices.next(currentDevices);
      localStorage.setItem('scannedDevices', JSON.stringify(currentDevices));
      return true;
    }
    return false;
  }

  getDeviceCount(): number {
    return this.scannedDevices.value.length;
  }

  clearDevices() {
    this.scannedDevices.next([]);
    localStorage.removeItem('scannedDevices');
  }

  setNbPlayers(nb: number) {
    this.nbPlayers = nb;
    localStorage.setItem('nbPlayers', nb.toString());
  }

  getNbPlayers(): number {
    return this.nbPlayers;
  }

  addCook(cook: Cook): boolean {
    const currentCooks = this.cooks.value;
    if (!currentCooks.some(c => c.deviceId === cook.deviceId)) {
      currentCooks.push(cook);
      this.cooks.next(currentCooks);
      localStorage.setItem('cooks', JSON.stringify(currentCooks));
      return true;
    }
    return false;
  }

  getCooks(): Cook[] {
    return this.cooks.value;
    //return mockCooks;
  }

  clearCooks() {
    this.cooks.next([]);
    localStorage.removeItem('cooks');
    localStorage.removeItem('nbPlayers');
  }
}
