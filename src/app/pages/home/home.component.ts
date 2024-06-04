import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  projectName = 'Bachelor\'s Diploma Project “Web service for collecting information from electronic trading platforms”' //'Project D'
  isReady = true
}
