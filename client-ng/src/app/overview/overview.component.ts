import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalitycsService} from '../shared/servises/analitycs.service';
import {Observable} from 'rxjs';
import {OverviewPage} from '../shared/interfaces';
import {MaterialInstance, MaterialToastService} from '../shared/material-toast.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  yesterdate = new Date;

  constructor(public service: AnalitycsService) {
  }

  ngOnInit() {
    this.data$ = this.service.getOverview();
    this.yesterdate.setDate(this.yesterdate.getDate() - 1);
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialToastService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  onOpenInfo() {
    this.tapTarget.open();
  }
}
