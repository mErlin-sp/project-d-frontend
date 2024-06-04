import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {

}
