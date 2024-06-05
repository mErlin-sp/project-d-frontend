import {Component, OnInit} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {LogService} from "../../log.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgForOf
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit {
  logs: string[] = [];

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.logs = this.logService.getLogs();
    setInterval(() => {
      this.logs = this.logService.getLogs();
    }, 3000);
  }
}
