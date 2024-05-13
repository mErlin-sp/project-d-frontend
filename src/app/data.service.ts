import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const service = 'http://127.0.0.1:8000'

@Injectable({providedIn: 'root'})

export class DataService {

  constructor(private http: HttpClient) {
  }

  getQueries(): Observable<string[][]> {
    return this.http.get<string[][]>(`${service}/db/queries`);
  }

  setQueryActive(queryId: number, active: boolean): Observable<any> {
    return this.http.get<any>(`${service}/db/query/${queryId}/active/${active}`);
  }

  addQuery(query: string): Observable<any> {
    return this.http.get<any>(`${service}/db/queries/add-query/${query}`);
  }
}
