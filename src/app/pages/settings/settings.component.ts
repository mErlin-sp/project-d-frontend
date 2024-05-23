import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {catchError, interval, throwError} from "rxjs";
import {DataService} from "../../data.service";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HomeButtonComponent,
    MatFormField,
    FormsModule,
    MatInputModule,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  updateInterval: number | null = null;
  newInterval: number | null = null;

  ngOnInit(): void {
    // Load the current update interval
    this.loadData()
    interval(3000).subscribe(() => {
      this.loadData()
    });
  }

  constructor(private dataService: DataService) {
  }

  loadData(): void {
    this.dataService.getUpdateInterval().pipe(
      catchError(error => {
        console.error('Error loading update interval', error);
        return throwError(() => error);
      })
    ).subscribe((result: any) => {
      this.updateInterval = result['update_interval'];
      console.log('Loaded update interval:', this.updateInterval);
    });
  }

  setUpdateInterval(): void {
    if (this.newInterval === null) {
      console.error('New interval is null');
      return;
    }
    this.dataService.setUpdateInterval(this.newInterval).pipe(
      catchError(error => {
        console.error('Error setting update interval', error);
        alert('Error setting update interval');
        return throwError(() => error);
      })
    ).subscribe((result: any) => {
      console.log('Set update interval:', this.newInterval);
      this.loadData();
    });
  }
}
