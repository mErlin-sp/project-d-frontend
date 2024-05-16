import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-availability-history',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './availability-history.component.html',
  styleUrl: './availability-history.component.scss'
})
export class AvailabilityHistoryComponent {

}
