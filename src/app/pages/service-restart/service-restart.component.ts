import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {catchError, EMPTY, interval, throwError} from "rxjs";
import {DataService} from "../../data.service";
import {NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-service-restart',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgStyle,
    MatButton,
    NgIf
  ],
  templateUrl: './service-restart.component.html',
  styleUrl: './service-restart.component.scss'
})
export class ServiceRestartComponent implements OnInit {
  serviceStatus: string = 'Not updated';
  lastUpdated: number = -1;
  timeSinceLastUpdate = -1

  getServiceStatusColor() {
    switch (this.serviceStatus) {
      case 'RUNNING':
        return 'green';
      case 'NOT Running':
        return 'red';
      default:
        return 'yellow';
    }
  }

  getTimeSinceLastUpdate() {
    if (this.lastUpdated === -1) {
      return
    }
    this.timeSinceLastUpdate = Math.floor((Date.now() - this.lastUpdated) / 1000)
  }

  ngOnInit(): void {
    this.updateServiceStatus();
    interval(5000).subscribe(() => {
      this.updateServiceStatus();
    });
    interval(100).subscribe(() => {
      this.getTimeSinceLastUpdate();
    });
  }

  constructor(private dataService: DataService) {
  }

  updateServiceStatus() {
    this.dataService.testService().pipe(
      catchError(error => {
        this.serviceStatus = 'NOT Running'
        this.lastUpdated = Date.now()
        console.error('Service not running', error);

        return throwError(() => new Error(error));
      })
    ).subscribe((response: any[]) => {
      this.serviceStatus = 'RUNNING'
      this.lastUpdated = Date.now()
      console.debug('Service running', response);
    });
  }

  restartService() {
    console.debug('Restarting service...');
    this.dataService.restartService().pipe(
      catchError(() => {
        console.debug('Waiting for service to restart...')

        this.serviceStatus = 'Not updated';
        this.lastUpdated = -1;
        this.timeSinceLastUpdate = -1

        alert('Restart request sent. Please wait a few seconds, page will refresh automatically.')
        this.updateServiceStatus();

        return EMPTY
      })
    ).subscribe((response: any[]) => {
      console.debug(`You shouldn't be there :)`, response);
    });
  }
}
