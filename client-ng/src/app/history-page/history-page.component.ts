import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialToastService} from '../shared/material-toast.service';

import {OrdersService} from '../shared/servises/orders.service';
import {Subscription} from 'rxjs';
import {Filter, Order} from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFilterVisible = false;
  offset = 0;
  limit = STEP;
  oSub: Subscription;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  noMoreOrders = true;

  filter: Filter = {};

  constructor(
    public ordersService: OrdersService
  ) {
  }

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  fetch() {
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit
    // };

    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.loading = false;
      this.reloading = false;
      if (orders.length < STEP) {
        this.noMoreOrders = false;
      }
      console.log(orders.length);
    });
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialToastService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

  loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    console.log(filter);
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  isFilterBool() {
    return Object.keys(this.filter).length !== 0;
  }
}
