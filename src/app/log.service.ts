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

  startLogging() {
    const originalConsoleLog = console.log;
    console.log = (...data: any[]) => {
      this.addLog(data.join(' '));
      originalConsoleLog.apply(console, data);
    };

    const originalConsoleError = console.error;
    console.error = (...data: any[]) => {
      this.addLog(data.join(' '));
      originalConsoleError.apply(console, data);
    };

    const originalConsoleWarn = console.warn;
    console.warn = (...data: any[]) => {
      this.addLog(data.join(' '));
      originalConsoleWarn.apply(console, data);
    };

    const originalConsoleInfo = console.info;
    console.info = (...data: any[]) => {
      this.addLog(data.join(' '));
      originalConsoleInfo.apply(console, data);
    };

    const originalConsoleDebug = console.debug;
    console.debug = (...data: any[]) => {
      this.addLog(data.join(' '));
      originalConsoleDebug.apply(console, data);
    };
  }
}
