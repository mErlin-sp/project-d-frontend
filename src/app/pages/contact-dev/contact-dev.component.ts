import {Component} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-contact-dev',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './contact-dev.component.html',
  styleUrl: './contact-dev.component.scss'
})
export class ContactDevComponent {
  developerEmail = 'merlin.ua.1@gmail.com';
}
