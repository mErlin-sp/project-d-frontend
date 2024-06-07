import {Component} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {MatAnchor} from "@angular/material/button";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [
    HomeButtonComponent,
    MatAnchor
  ],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})

export class ExportComponent {
  service = environment.apiUrl
  exportToCsv: string = `${this.service}/export/csv`
  exportToXLSX: string = `${this.service}/export/xlsx`
  exportToSqLite: string = `${this.service}/export/sqlite-db`
}
