import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {catchError, interval, Subject, takeUntil, throwError} from "rxjs";
import {DataService} from "../../data.service";
import {MatIconButton} from "@angular/material/button";
import {environment} from "../../../environments/environment";

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
export class SettingsComponent implements OnInit, OnDestroy {
  updateInterval: number | null = null;
  newInterval: number | null = null;

  protected service: string = environment.apiUrl
  protected production: boolean = environment.production

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Load the current update interval
    this.loadData()
    interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadData()
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(protected dataService: DataService) {
  }

  loadData(): void {
    this.dataService.getUpdateInterval().pipe(
      catchError(error => {
        console.error('Error loading update interval', error);
        return throwError(() => error);
      })
    ).subscribe((result: any) => {
      this.updateInterval = parseInt(result['update_interval']);
      console.log('Loaded update interval:', this.updateInterval);
    });
  }

  setUpdateInterval(): void {
    if (!this.newInterval) {
      console.error('New interval is null');
      return;
    }
    console.log('Set update interval:', this.newInterval);

    this.dataService.setUpdateInterval(this.newInterval).pipe(
      catchError(error => {
        console.error('Error setting update interval', error);
        alert('Error setting update interval');
        return throwError(() => error);
      })
    ).subscribe(() => {
      console.log('Set update interval success');
      this.loadData();
    });
  }
}
