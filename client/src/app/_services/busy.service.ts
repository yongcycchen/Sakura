import { Injectable } from '@angular/core';

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
