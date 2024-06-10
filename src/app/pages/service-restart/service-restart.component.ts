import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {catchError, EMPTY, interval, Subject, takeUntil, throwError} from "rxjs";
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
export class ServiceRestartComponent implements OnInit, OnDestroy {
  serviceStatus: string = 'Not updated';
  lastUpdated: number = -1;
  timeSinceLastUpdate = -1

  private destroy$ = new Subject<void>();

  getServiceStatusColor(): 'green' | 'red' | 'yellow' {
    switch (this.serviceStatus) {
      case 'RUNNING':
        return 'green';
      case 'NOT Running':
        return 'red';
      default:
        return 'yellow';
    }
  }

  getTimeSinceLastUpdate(): void {
    if (this.lastUpdated !== -1) {
      this.timeSinceLastUpdate = Math.floor((Date.now() - this.lastUpdated) / 1000)
    }
  }

  ngOnInit(): void {
    this.updateServiceStatus();
    interval(5000).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(() => {
        this.updateServiceStatus();
      });
    interval(100).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(() => {
        this.getTimeSinceLastUpdate();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private dataService: DataService) {
  }

  updateServiceStatus(): void {
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
      console.log('Service running', response);
    });
  }

  restartService(): void {
    let confirmed: boolean = confirm('Are you sure you want to restart the service?')
    if (!confirmed) {
      return
    }

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
