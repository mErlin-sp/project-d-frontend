import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

const service = environment.apiUrl

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

  getPlatforms(): Observable<string[]> {
    return this.http.get<string[]>(`${service}/platforms`);
  }

  getGoods(): Observable<any> {
    return this.http.get<any>(`${service}/db/goods`);
  }

  getPrices(goodId: number): Observable<any> {
    return this.http.get<any>(`${service}/db/prices/${goodId}`);
  }

  getAvailability(goodId: number): Observable<any> {
    return this.http.get<any>(`${service}/db/in-stock/${goodId}`);
  }

  getUpdateInterval(): Observable<any> {
    return this.http.get<any>(`${service}/settings/update-interval`);
  }

  setUpdateInterval(interval: number): Observable<any> {
    return this.http.get<any>(`${service}/settings/update-interval/${interval}`);
  }

  testService(): Observable<any> {
    return this.http.get<any>(`${service}/`);
  }

  restartService(): Observable<any> {
    return this.http.get<any>(`${service}/restart-service`);
  }

  getDBType(): Observable<any> {
    return this.http.get<any>(`${service}/settings/db-type`);
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${service}/statistics`);
  }

}
