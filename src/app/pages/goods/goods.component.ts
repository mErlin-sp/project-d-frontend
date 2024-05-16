import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent {

}
