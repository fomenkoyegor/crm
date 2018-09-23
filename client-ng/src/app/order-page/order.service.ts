import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderPosition, Position} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  list: OrderPosition[] = [];
  price = 0;

  constructor(public http: HttpClient) {
  }

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quontity: position.quontity,
      _id: position._id
    });
    const candidate = this.list.find(p => p._id === orderPosition._id);
    if (candidate) {
      //  меняем quontity
      candidate.quontity += position.quontity;

    } else {
      this.list.push(orderPosition);
    }
    this.computedPrice();
  }

  computedPrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quontity * item.cost;
    }, 0);
  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.computedPrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }


}
