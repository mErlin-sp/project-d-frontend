import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DataService} from "../../data.service";
import {catchError, interval, Subject, takeUntil, throwError} from "rxjs";
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-tracking-queries',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgForOf,
    NgIf,
    NgStyle,
  ],
  templateUrl: './tracking-queries.component.html',
  styleUrl: './tracking-queries.component.scss'
})

export class TrackingQueriesComponent implements OnInit, OnDestroy {
  queries: any[] = [];

  updateStatus: string = 'Not updated'
  lastUpdated = -1
  timeSinceLastUpdate = -1

  private destroy$ = new Subject<void>();

  getUpdateStatusColor() {
    switch (this.updateStatus) {
      case 'OK':
        return 'green';
      case 'Error loading queries':
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

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
    interval(20000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadData();
      });
    interval(100)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getTimeSinceLastUpdate();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.dataService.getQueries().pipe(
      catchError(error => {
        this.updateStatus = 'Error loading queries'
        this.lastUpdated = -1
        console.error('Error loading queries', error);

        return throwError(() => new Error(error));
      })
    ).subscribe((response: any[]) => {
      this.queries = response;
      this.lastUpdated = Date.now()
      this.updateStatus = 'OK'
      console.debug('Queries loaded', response);
    });
  }

  deactivateQuery(queryID: number): void {
    this.dataService.setQueryActive(queryID, false).pipe(
      catchError(error => {
        alert('Error deactivating query');
        console.error('Error deactivating query', error);
        return throwError(() => error);
      })
    ).subscribe((response: any[]) => {
      console.log('Query deactivated', response);
    });
    this.loadData();
  }

  activateQuery(queryID: number): void {
    this.dataService.setQueryActive(queryID, true).pipe(
      catchError(error => {
        alert('Error activating query');
        console.error('Error activating query', error);
        return throwError(() => error);
      })
    ).subscribe((response: any[]) => {
      console.log('Query activated', response);
    });
    this.loadData();
  }

  addQuery() {
    let query = prompt('Enter query');
    if (!query) {
      return;
    }
    this.dataService.addQuery(query).pipe(
      catchError(error => {
        alert('Error adding query');
        console.error('Error adding query', error);
        return throwError(() => error);
      })
    ).subscribe((response: any[]) => {
      console.log('Query added', response);
    });
    this.loadData();
  }
}
