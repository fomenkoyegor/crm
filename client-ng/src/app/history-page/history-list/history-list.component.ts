import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order, OrderPosition} from '../../shared/interfaces';
import {forEach} from '@angular/router/src/utils/collection';
import {MaterialInstance, MaterialToastService} from '../../shared/material-toast.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  selectedOrder: Order;

  constructor() {
  }

  ngOnInit() {
  }

  computedPrice(order: Order) {
    return order.list.reduce((total, item) => {
      return total += item.quontity * item.cost;
    }, 0);
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  clouseModal() {
    this.modal.close();
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialToastService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }
}
