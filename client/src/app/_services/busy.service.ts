import { Injectable } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor() { }

  busy(){
    this.busyRequestCount++;
  }
  idle(){
    this.busyRequestCount--;
  }
}
