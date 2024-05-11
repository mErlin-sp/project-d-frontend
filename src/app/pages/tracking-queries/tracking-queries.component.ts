import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {DataService} from "../../data.service";
import {catchError, interval, throwError} from "rxjs";
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
    selector: 'app-tracking-queries',
    standalone: true,
    imports: [
        HomeButtonComponent,
        NgForOf,
        NgIf,
        NgStyle
    ],
    templateUrl: './tracking-queries.component.html',
    styleUrl: './tracking-queries.component.scss'
})

export class TrackingQueriesComponent implements OnInit {
    queries: any[] = [];

    updateStatus: string = 'Not updated'
    lastUpdated = -1
    timeSinceLastUpdate = -1

    getUpdateStatusColor() {
        switch (this.updateStatus) {
            case 'OK':
                return 'green';
            case 'Error loading queries':
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
        interval(20000).subscribe(() => {
            this.loadData();
        });
        interval(100).subscribe(() => {
            this.getTimeSinceLastUpdate();
        });
    }


    loadData(): void {
        this.dataService.getQueries().pipe(
            catchError(error => {
                this.updateStatus = 'Error loading queries'
                this.lastUpdated = -1
                console.error('Error loading queries', error);

                return throwError(() => new Error(error));
            })
        ).subscribe((response: any[]) => {
            this.queries = response;
            this.lastUpdated = Date.now()
            this.updateStatus = 'OK'
            console.log('Queries loaded', response);
        });
    }

}
