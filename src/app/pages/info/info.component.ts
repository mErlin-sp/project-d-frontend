import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    HomeButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}
