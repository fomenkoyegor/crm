import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Order} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) {
  }

  crate(order: Order): Observable<Order> {
    console.log(order);
    return this.http.post<Order>('/api/order', order);
  }

  // "GET" locallhost:5000/api/order?offset=2&limit=5
  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get <Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

}
