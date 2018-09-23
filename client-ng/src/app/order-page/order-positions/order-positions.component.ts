import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PositionService} from '../../shared/servises/position.service';
import {Observable} from 'rxjs';
import {Position} from '../../shared/interfaces';
import {map, switchMap} from 'rxjs/operators';
import {extractStyleParams} from '@angular/animations/browser/src/util';
import {OrderService} from '../order.service';
import {MaterialToastService} from '../../shared/material-toast.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(public route: ActivatedRoute,
              public positionsService: PositionService,
              public orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(switchMap((params: Params) => {
          return this.positionsService.fetch(params['id']);
        }),
        map((positons: Position[]) => {
          return positons.map(position => {
            position.quontity = 1;
            return position;
          });
        })
      );
  }

  addToOrder(position: Position) {
    // console.log(position);
    MaterialToastService.toast(`Добавлено х${position.quontity} ${position.name}`);
    this.orderService.add(position);
  }
}
