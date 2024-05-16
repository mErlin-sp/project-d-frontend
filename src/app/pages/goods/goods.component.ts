import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../data.service";
import {catchError, forkJoin, interval, throwError} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatDatepickerModule
} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

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
    DatePipe
  ],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class GoodsComponent implements OnInit {
  goods: any[] = [];
  filteredGoods: any[] = [];
  platforms: string[] = [];
  queries: any[] = [];

  currentPlatform: string = 'all'
  currentQuery: number = -1;
  startDate: Date = new Date();
  endDate: Date = new Date();
  datesSelected = false;

  updateStatus: string = 'Not updated'
  lastUpdated = -1
  timeSinceLastUpdate = -1

  pageSize = 10
  currentPage = 0

  getUpdateStatusColor() {
    switch (this.updateStatus) {
      case 'OK':
        return 'green';
      case 'Error loading goods':
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
    this.loadData().then(() => this.filterGoods())
    interval(20000).subscribe(() => {
      this.loadData().then(() => this.filterGoods())
    });
    interval(100).subscribe(() => {
      this.getTimeSinceLastUpdate();
    });
    this.queries.find((query) => query[0] === this.currentQuery)[1]
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
        console.debug('Data loaded', results);

        resolve([])
      });
    });

    // this.dataService.getGoods().pipe(
    //   catchError(error => {
    //     this.updateStatus = 'Error loading goods'
    //     this.lastUpdated = -1
    //     console.error('Error loading goods', error);
    //
    //     return throwError(() => error);
    //   })
    // ).subscribe((response: any[]) => {
    //   this.goods = response;
    //   this.lastUpdated = Date.now()
    //   this.updateStatus = 'OK'
    //   console.debug('Goods loaded', response);
    // });
    //
    // this.dataService.getPlatforms().pipe(
    //   catchError(error => {
    //     console.error('Error loading platforms', error);
    //     return throwError(() => error);
    //   })
    // ).subscribe((platforms: string[]) => {
    //   this.platforms = platforms;
    //   console.debug('Platforms loaded', platforms);
    // });
    //
    // this.dataService.getQueries().pipe(
    //   catchError(error => {
    //     console.error('Error loading queries', error);
    //     return throwError(() => error);
    //   })
    // ).subscribe((response: any[]) => {
    //   this.queries = response;
    //   console.debug('Queries loaded', response);
    // });
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

  filterGoods() {
    console.log('Filtering goods')
    console.log('currentPlatform', this.currentPlatform)
    console.log('currentQuery', this.currentQuery)
    console.log('startDate', this.startDate)
    console.log('endDate', this.endDate)
    let filtered = this.getFilteredGoods();
    if (filtered !== this.filteredGoods) {
      this.currentPage = 0
      this.filteredGoods = filtered;
    }
    console.log('filteredGoods', this.filteredGoods.length)
  }

  dateChanged() {
    if (!this.datesSelected) {
      this.datesSelected = true;
      console.log('datesSelected')
    }
    this.filterGoods()
  }

  getFilteredGoods() {
    return this.goods.filter((good) => {
      return (good[1] === this.currentPlatform || this.currentPlatform === 'all')
        && (good[3] === this.currentQuery || this.currentQuery === -1)
        && ((this.startDate <= new Date(good[10]) && new Date(good[10]) <= this.endDate)
          || !this.datesSelected)
    });
  }

  getQueryName(queryId: number) {
    return this.queries.find((query) => query[0] === queryId)[1];
  }

  protected readonly Math = Math;
  protected readonly window = window;
}
