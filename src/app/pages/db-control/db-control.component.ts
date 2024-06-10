import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {catchError, interval, Subject, takeUntil, throwError} from "rxjs";
import {DataService} from "../../data.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-db-control',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgIf,
    MatAnchor,
    NgOptimizedImage
  ],
  templateUrl: './db-control.component.html',
  styleUrl: './db-control.component.scss'
})
export class DbControlComponent implements OnInit, OnDestroy {
  dbType: string = 'Unknown';

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.updateDBType()
    interval(5000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateDBType();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private dataService: DataService) {
  }

  updateDBType(): void {
    this.dataService.getDBType().pipe(
      catchError(error => {
        this.dbType = 'Unknown'
        console.error('Error getting DB type', error);
        return throwError(() => new Error(error));
      })
    ).subscribe((response: any) => {
      this.dbType = response['db_type']
      console.log('DB type: ', this.dbType);
    });
  }
}
