import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DataService} from "../../data.service";
import {catchError, interval, Subject, takeUntil, throwError} from "rxjs";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgStyle,
    NgIf
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit, OnDestroy {
  statistics: any | null = null;

  updateStatus: string = 'Not updated'
  lastUpdated: number = -1
  timeSinceLastUpdate: number = -1

  private destroy$ = new Subject<void>();

  getUpdateStatusColor(): 'green' | 'red' | 'yellow' {
    switch (this.updateStatus) {
      case 'OK':
        return 'green';
      case 'Error loading statistics':
        return 'red';
      default:
        return 'yellow';
    }
  }

  getTimeSinceLastUpdate() {
    if (this.lastUpdated !== -1) {
      this.timeSinceLastUpdate = Math.floor((Date.now() - this.lastUpdated) / 1000)
    }
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
    interval(10000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadData();
      });
    interval(100)
      .pipe(
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

  loadData(): void {
    this.dataService.getStatistics().pipe(
      catchError(error => {
        this.updateStatus = 'Error loading statistics'
        console.error('Error loading statistics', error);
        return throwError(() => new Error(error));
      })
    ).subscribe((response: any) => {
      this.statistics = response;
      this.lastUpdated = Date.now()
      this.updateStatus = 'OK'
      console.log('Statistics updated', response);
    });
  }
}
