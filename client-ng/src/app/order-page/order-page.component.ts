import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MaterialInstance, MaterialToastService} from '../shared/material-toast.service';
import {OrderService} from './order.service';
import {Order, OrderPosition} from '../shared/interfaces';
import {OrdersService} from '../shared/servises/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  pending = false;

  constructor(public router: Router,
              public orderService: OrderService,
              public ordersService: OrdersService
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialToastService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  openModal() {
    this.modal.open();
  }

  clouseModal() {
    this.modal.close();
    this.modal.destroy();
  }

  submit() {
    // this.modal.close();
    this.pending = true;
    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id;
        return item;
      })
    };

    this.ordersService.crate(order).subscribe(
      (newOrder) => {
        MaterialToastService.toast(`Заказ ${newOrder.order} был добавлен`);
        this.orderService.clear();
      },
      (err) => {
        MaterialToastService.toast(err.error.message);
        console.log(err);
      },
      () => {
        this.modal.close();
        this.pending = false;
      }
    );
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition);
  }
}
