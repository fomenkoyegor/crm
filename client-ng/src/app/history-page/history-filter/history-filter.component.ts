///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Filter} from '../../shared/interfaces';
import {MaterialDatePicker, MaterialToastService} from '../../shared/material-toast.service';
import {bind} from '@angular/core/src/render3/instructions';


const output = Output();

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @output onFilter = new EventEmitter<Filter>();
  order: number;
  @ViewChild('start') startRef: ElementRef;
  start: MaterialDatePicker;

  @ViewChild('end') endRef: ElementRef;
  end: MaterialDatePicker;

  isValid = true;

  constructor() {
  }

  ngOnInit() {
  }

  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

  ngAfterViewInit(): void {
    this.start = MaterialToastService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialToastService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }
}
