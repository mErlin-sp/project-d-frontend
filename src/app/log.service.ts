import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LogService {
  logs: string[] = [];

  addLog(message: string) {
    this.logs.push(message);
  }

  getLogs() {
    return this.logs;
  }
}
