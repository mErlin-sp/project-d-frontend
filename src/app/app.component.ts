import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LogService} from "./log.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private logging: boolean = true;

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    if (this.logging) {
      this.logService.startLogging();
    }
  }
}
