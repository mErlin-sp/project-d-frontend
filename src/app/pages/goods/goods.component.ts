import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../data.service";
import {catchError, forkJoin, interval, Subject, takeUntil, throwError} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatDatepickerModule
} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgForOf,
    NgIf,
    NgStyle,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelect,
    MatOption,
    FormsModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss',
  providers: [provideNativeDateAdapter()]
})

export class GoodsComponent implements OnInit, OnDestroy {
  goods: [number, string, number, number, string, string, string, string, string, string, string][] = [];
  filteredGoods: [number, string, number, number, string, string, string, string, string, string, string][] = [];
  platforms: string[] = [];
  queries: [number, string, number][] = [];

  currentPlatform: string = 'all'
  currentQuery: number = -1;
  startDate: Date = new Date();
  endDate: Date = new Date();
  datesSelected: boolean = false;

  updateStatus: string = 'Not updated'
  lastUpdated: number = -1
  timeSinceLastUpdate: number = -1

  pageSize: number = 10
  currentPage: number = 0

  private destroy$ = new Subject<void>();

  getUpdateStatusColor(): 'green' | 'red' | 'yellow' {
    switch (this.updateStatus) {
      case 'OK':
        return 'green';
      case 'Error loading goods':
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

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData().then(() => this.filterGoods())
    interval(20000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadData().then(() => this.filterGoods())
      });
    interval(100)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getTimeSinceLastUpdate();
      });

    // if (this.queries.length > 0) {
    //   this.queries.find((query: [number, string, number]) => query[0] === this.currentQuery)[1]
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      forkJoin([
        this.dataService.getGoods(),
        this.dataService.getQueries(),
        this.dataService.getPlatforms()
      ]).pipe(
        catchError(error => {
          this.updateStatus = 'Error loading data'
          this.lastUpdated = -1
          console.error('Error loading data', error);
          reject(error)
          return throwError(() => error);
        })
      ).subscribe((results: any[]) => {
        const [goods, queries, platforms] = results
        this.goods = goods;
        this.queries = queries;
        this.platforms = platforms;

        this.lastUpdated = Date.now()
        this.updateStatus = 'OK'
        console.log('Goods data loaded', results);
        resolve([])
      });
    });
  }

  getLastPage(): number {
    return Math.ceil(this.goods.length / this.pageSize) - 1
  }

  nextPage() {
    if (this.currentPage < this.getLastPage()) {
      this.currentPage += 1
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1
    }
  }

  firstPage() {
    this.currentPage = 0
  }

  lastPage() {
    this.currentPage = this.getLastPage()
  }

  filterGoods(): void {
    console.log('Filtering goods')
    console.log('currentPlatform', this.currentPlatform)
    console.log('currentQuery', this.currentQuery)
    console.log('startDate', this.startDate)
    console.log('endDate', this.endDate)
    let filtered: [number, string, number, number, string, string, string, string, string, string, string][] = this.getFilteredGoods();
    if (filtered !== this.filteredGoods) {
      this.currentPage = 0
      this.filteredGoods = filtered;
    }
    console.log('filteredGoods', this.filteredGoods.length)
  }

  dateChanged(): void {
    if (!this.datesSelected) {
      this.datesSelected = true;
      console.debug('datesSelected')
    }
    this.filterGoods()
  }

  getFilteredGoods(): [number, string, number, number, string, string, string, string, string, string, string][] {
    return this.goods.filter((good: [number, string, number, number, string, string, string, string, string, string, string]) => {
      return (good[1] === this.currentPlatform || this.currentPlatform === 'all')
        && (good[3] === this.currentQuery || this.currentQuery === -1)
        && ((this.startDate <= new Date(good[10]) && new Date(good[10]) <= this.endDate)
          || !this.datesSelected)
    });
  }

  getQueryName(queryId: number): string | undefined {
    let query = this.queries.find((query) => query[0] === queryId)
    return query && query[1];
  }

  protected readonly Math = Math;
  protected readonly window = window;
}
