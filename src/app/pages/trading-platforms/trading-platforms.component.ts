import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../data.service";
import {catchError, interval, Subject, takeUntil, throwError} from "rxjs";

@Component({
  selector: 'app-trading-platforms',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './trading-platforms.component.html',
  styleUrl: './trading-platforms.component.scss'
})
export class TradingPlatformsComponent implements OnInit, OnDestroy {
  platforms: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
    interval(20000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.dataService.getPlatforms().pipe(
      catchError(error => {
        console.error('Error loading platforms', error);
        return throwError(() => error);
      })
    ).subscribe((platforms: string[]) => {
      this.platforms = platforms;
      console.log('Platforms loaded', platforms);
    });
  }
}
