import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}
