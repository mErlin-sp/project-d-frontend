import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-service-restart',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './service-restart.component.html',
  styleUrl: './service-restart.component.scss'
})
export class ServiceRestartComponent {

}
