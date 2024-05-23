import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, throwError} from "rxjs";
import {DataService} from "../../data.service";
import {NgIf} from "@angular/common";
import {BaseChartDirective} from "ng2-charts";
import {ChartData, ChartOptions} from "chart.js";
import {Chart} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-price-history',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgIf,
    BaseChartDirective,
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './price-history.component.html',
  styleUrl: './price-history.component.scss',
  providers: []
})
export class PriceHistoryComponent implements OnInit {
  goodId: string | null = null;
  prices: [number, string][] = [];

  loadingStatus: string = 'Not loaded'

  chartData: ChartData<'line', { price: number, timestamp: string } []> = {
    datasets: [],
    labels: [],
    xLabels: [],
    yLabels: []
  };

  chartOptions: ChartOptions = {
    scales: {
      x: {
        type: 'timeseries',
      },
    }
  }

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    // Extract the path parameter
    this.goodId = this.route.snapshot.paramMap.get('good_id');
    if (this.goodId !== null) {
      this.componentInit();
    }
  }

  componentInit() {
    console.log('good_id: ', this.goodId)

    this.loadData().then(() => {
      console.log('prices: ', this.prices)
      this.processData();
    });
  }

  loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      forkJoin([
        this.goodId !== null ? this.dataService.getPrices(Number.parseInt(this.goodId)) : Promise.resolve([]),
      ]).pipe(
        catchError(error => {
          this.loadingStatus = 'Error loading data'
          console.error('Error loading data', error);

          reject(error)
          return throwError(() => error);
        })
      ).subscribe((results: any[]) => {
        const [prices] = results
        this.prices = prices;
        if (this.prices.length === 0) {
          this.loadingStatus = 'No data'
          console.error('No data found for goodId: ' + this.goodId);
          alert('No data found for goodId: ' + this.goodId)
          reject(new Error('No data found for goodId: ' + this.goodId))
        }

        this.loadingStatus = 'OK'
        console.debug('Data loaded', results);

        resolve([])
      });
    });
  }

  processData() {
    // this.chartData = {
    //   // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'Price History',
    //       data: this.prices,
    //       fill: false,
    //       borderColor: '#4bc0c0'
    //     }
    //   ]
    // }

    let data: { price: number; timestamp: string }[] = this.prices.map((innerArr: [number, string]) => ({
      price: innerArr[0],
      timestamp: innerArr[1]
    }));


    this.chartData = {
      datasets: [
        {
          label: 'Price History',
          data: data,
          parsing: {
            xAxisKey: 'timestamp',
            yAxisKey: 'price'
          }
        }
      ],
    };

    console.log('chartData: ', this.chartData)
  }

}
