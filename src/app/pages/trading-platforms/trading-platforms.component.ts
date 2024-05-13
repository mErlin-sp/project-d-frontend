import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../data.service";
import {catchError, interval, throwError} from "rxjs";

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
export class TradingPlatformsComponent implements OnInit {
  platforms: string[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
    interval(20000).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.dataService.getPlatforms().pipe(
      catchError(error => {
        console.error('Error loading platforms', error);

        return throwError(() => error);
      })
    ).subscribe((platforms: string[]) => {
      this.platforms = platforms;
      console.debug('Platforms loaded', platforms);
    });
  }
}
