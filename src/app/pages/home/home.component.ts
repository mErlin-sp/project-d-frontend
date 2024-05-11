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
  isReady: boolean = false;

  onHover() {
    setTimeout(() => {
      this.isReady = true;
      console.debug('Menu is ready');
    }, 2000);
  }

  onLeave() {
    this.isReady = false;
    console.debug('Menu is not ready');
  }
}
