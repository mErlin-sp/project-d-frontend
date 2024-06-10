import {Component} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-contact-dev',
  standalone: true,
  imports: [
    HomeButtonComponent,
    MatAnchor
  ],
  templateUrl: './contact-dev.component.html',
  styleUrl: './contact-dev.component.scss'
})
export class ContactDevComponent {
  developerEmail = 'merlin.ua.1@gmail.com';
}
