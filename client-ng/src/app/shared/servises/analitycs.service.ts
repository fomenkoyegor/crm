import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnalyticsPage, OverviewPage} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnalitycsService {

  constructor(public http: HttpClient) {
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analitycs/overview');
  }

  getAnalitycs(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analitycs/analitycs');
  }
}
