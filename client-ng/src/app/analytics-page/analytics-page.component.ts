import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalitycsService} from '../shared/servises/analitycs.service';
import {AnalyticsPage} from '../shared/interfaces';
import {MaterialToastService} from '../shared/material-toast.service';
import {Subscription} from 'rxjs';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  average: number;
  pending = true;
  aSub: Subscription;

  constructor(public service: AnalitycsService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 39, 132)'
    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.service.getAnalitycs().subscribe(
      (data: AnalyticsPage) => {
        console.log(data);
        this.average = data.average;

        gainConfig.labels = data.chart.map(item => item.label);
        gainConfig.data = data.chart.map(item => item.gain);

        orderConfig.labels = data.chart.map(item => item.label);
        orderConfig.data = data.chart.map(item => item.order);

        // **** Gain ****
        // gainConfig.labels.push('08.05.2018');
        // gainConfig.labels.push('09.05.2018');
        // gainConfig.data.push(1500);
        // gainConfig.data.push(700);
        // **** /Gain ****

        // **** Order ****
        // orderConfig.labels.push('08.05.2018');
        // orderConfig.labels.push('09.05.2018');
        // orderConfig.data.push(5);
        // orderConfig.data.push(12);
        // **** /Order ****

        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';
        orderCtx.canvas.height = '300px';

        new Chart(gainCtx, createChartConfig(gainConfig));
        new Chart(orderCtx, createChartConfig(orderConfig));

        this.pending = false;

      },
      (err) => {
        console.log(err);
        MaterialToastService.toast(err.error.message);
      },
      () => {
      },
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}


function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
