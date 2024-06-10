import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {LogService} from "../../log.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatAnchor} from "@angular/material/button";
import {environment} from "../../../environments/environment";
import {interval, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgForOf,
    MatAnchor,
    NgIf
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit, OnDestroy {
  frontendLog: string[] = [];

  private service: string = environment.apiUrl;
  protected serviceLog: string = this.service + '/log';

  private destroy$ = new Subject<void>();

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.frontendLog = this.logService.getLogs();
    interval(3000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.frontendLog = this.logService.getLogs();
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
