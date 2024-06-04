import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

}
