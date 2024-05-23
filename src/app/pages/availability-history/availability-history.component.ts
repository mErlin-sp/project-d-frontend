import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {BaseChartDirective} from "ng2-charts";
import {NgIf} from "@angular/common";
import {ChartData, ChartOptions} from "chart.js";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {catchError, forkJoin, throwError} from "rxjs";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-availability-history',
  standalone: true,
  imports: [
    HomeButtonComponent,
    BaseChartDirective,
    NgIf,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './availability-history.component.html',
  styleUrl: './availability-history.component.scss'
})
export class AvailabilityHistoryComponent implements OnInit {
  goodId: string | null = null;
  inStock: [boolean, string][] = [];

  loadingStatus: string = 'Not loaded'

  chartData: ChartData<'bar', { in_stock: boolean, timestamp: string } []> = {
    datasets: [],
    labels: [],
    xLabels: [],
    yLabels: []
  };

  chartOptions: ChartOptions<'bar'> = {
    scales: {
      x: {
        type: 'timeseries',
      },
      y: {
        ticks: {
          callback: function (value) {
            return value ? 'Yes' : 'No'; // Convert boolean to 'Yes' or 'No'
          },
        },
        title: {
          display: true,
          text: 'Is Available?'
        }
      }
    }
  }

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    // Extract the path parameter
    this.goodId = this.route.snapshot.paramMap.get('good_id');
    if (this.goodId !== null) {
      this.componentInit()
    }
  }

  componentInit() {
    console.log('good_id: ', this.goodId)
    this.loadData().then(() => {
      console.log('inStock: ', this.inStock)
      this.processData();
    });
  }

  loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      forkJoin([
        this.goodId !== null ? this.dataService.getAvailability(Number.parseInt(this.goodId)) : Promise.reject(new Error('No goodId')),
      ]).pipe(
        catchError(error => {
          this.loadingStatus = 'Error loading data'
          console.error('Error loading data', error);

          reject(error)
          return throwError(() => error);
        })
      ).subscribe((results: any[]) => {
        const [availability] = results
        this.inStock = availability;
        if (this.inStock.length === 0) {
          this.loadingStatus = 'No data'
          console.error('No data found for goodId: ', this.goodId);
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
    if (this.inStock.length === 0) {
      console.error('No data to process')
      return;
    }
    let data: { in_stock: boolean; timestamp: string }[] = this.inStock.map((innerArr: [boolean, string]) => ({
      in_stock: innerArr[0],
      timestamp: innerArr[1]
    }));


    this.chartData = {
      datasets: [
        {
          label: 'Availability History',
          data: data,
          backgroundColor: 'orange',
          parsing: {
            xAxisKey: 'timestamp',
            yAxisKey: 'in_stock'
          }
        }
      ],
    };

    console.log('chartData: ', this.chartData)
  }

}
