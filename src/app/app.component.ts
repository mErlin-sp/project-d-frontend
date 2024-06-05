import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LogService} from "./log.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    const originalConsoleLog = console.log;
    console.log = (message: any) => {
      this.logService.addLog(message);
      originalConsoleLog.apply(console, [message]);
    };
    const originalConsoleError = console.error;
    console.error = (message: any) => {
      this.logService.addLog(message);
      originalConsoleError.apply(console, [message]);
    };
    const originalConsoleWarn = console.warn;
    console.warn = (message: any) => {
      this.logService.addLog(message);
      originalConsoleWarn.apply(console, [message]);
    };
    const originalConsoleInfo = console.info;
    console.info = (message: any) => {
      this.logService.addLog(message);
      originalConsoleInfo.apply(console, [message]);
    };
    const originalConsoleDebug = console.debug;
    console.debug = (message: any) => {
      this.logService.addLog(message);
      originalConsoleDebug.apply(console, [message]);
    };
  }
}
