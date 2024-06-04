import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-db-control',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './db-control.component.html',
  styleUrl: './db-control.component.scss'
})
export class DbControlComponent {

}
