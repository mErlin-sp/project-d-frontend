import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const service = 'http://127.0.0.1:8000'

@Injectable({providedIn: 'root'})

export class DataService {

  constructor(private http: HttpClient) {
  }

  getQueries(): Observable<String[][]> {
    return this.http.get<String[][]>(`${service}/db/queries`);
  }
}
