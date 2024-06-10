import {Component} from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [
    HomeButtonComponent,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatAnchor
  ],
  templateUrl: './api-docs.component.html',
  styleUrl: './api-docs.component.scss'
})

export class ApiDocsComponent {
  apiDocsUrl: string = `${environment.apiUrl}/docs`
  openApiUrl: string = `${environment.apiUrl}/openapi.json`
  openApiYamlUrl: string = `${environment.apiUrl}/openapi.yaml`
}
