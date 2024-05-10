import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexFill,
  ApexMarkers,
  ApexStroke,
  ChartComponent,
} from 'ngx-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ngx-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent implements OnInit {
  @Input() finishedBooings: number = 0;
  @Input() newBooings: number = 0;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() {}
  ngOnInit(): void {
    this.chartOptions = {
      series: [this.newBooings, this.finishedBooings],
      chart: {
        type: 'donut',
      },
      labels: ['الجديدة', 'المنتهية'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
