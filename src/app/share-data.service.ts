import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  private dataSubject = new Subject<any>();

  // Observable pour écouter les données
  data$ = this.dataSubject.asObservable();

  // Méthode pour envoyer des données
  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
