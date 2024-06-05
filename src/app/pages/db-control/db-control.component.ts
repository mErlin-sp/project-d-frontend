import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {catchError, interval, throwError} from "rxjs";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-db-control',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './db-control.component.html',
  styleUrl: './db-control.component.scss'
})
export class DbControlComponent implements OnInit {
  dbType: string = 'Unknown';

  ngOnInit(): void {
    this.updateDBType()
    interval(5000).subscribe(() => {
      this.updateDBType();
    });
  }

  constructor(private dataService: DataService) {
  }

  updateDBType() {
    this.dataService.getDBType().pipe(
      catchError(error => {
        this.dbType = 'Unknown'
        console.error('Error getting DB type', error);

        return throwError(() => new Error(error));
      })
    ).subscribe((response: any) => {
      this.dbType = response['db_type']
      console.debug('DB type:', this.dbType);
    });
  }
}
