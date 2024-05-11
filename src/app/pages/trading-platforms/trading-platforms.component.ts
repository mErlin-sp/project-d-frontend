import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-trading-platforms',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './trading-platforms.component.html',
  styleUrl: './trading-platforms.component.scss'
})
export class TradingPlatformsComponent {

}
