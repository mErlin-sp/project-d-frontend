import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {

}
