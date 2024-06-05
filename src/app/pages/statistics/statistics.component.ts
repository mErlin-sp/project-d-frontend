import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DataService} from "../../data.service";
import {catchError, interval, throwError} from "rxjs";
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
export class StatisticsComponent implements OnInit {
  statistics: any = null;

  updateStatus: string = 'Not updated'
  lastUpdated = -1
  timeSinceLastUpdate = -1

  getUpdateStatusColor() {
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
    if (this.lastUpdated === -1) {
      return
    }
    this.timeSinceLastUpdate = Math.floor((Date.now() - this.lastUpdated) / 1000)
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
    interval(10000).subscribe(() => {
      this.loadData();
    });
    interval(100).subscribe(() => {
      this.getTimeSinceLastUpdate();
    });
  }

  loadData(): void {
    this.dataService.getStatistics().pipe(
      catchError(error => {
        this.updateStatus = 'Error loading statistics'
        this.lastUpdated = -1
        console.error('Error loading statistics', error);

        return throwError(() => new Error(error));
      })
    ).subscribe((response: any[]) => {
      this.statistics = response;
      this.lastUpdated = Date.now()
      this.updateStatus = 'OK'
      console.debug('Statistics updated', response);
    });
  }
}
