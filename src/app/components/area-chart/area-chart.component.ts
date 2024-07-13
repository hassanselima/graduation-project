import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis,
} from 'ngx-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  Yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css',
})
export class AreaChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  @Input() monthlySum: { year: number; month: number; total: number }[] = [];
  months: number[] = [];
  totals: number[] = [];
  categories: string[] = [];
  monthNames: string[] = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  constructor() {}
  ngOnInit(): void {
    this.months = this.monthlySum.map((item) => item.month);
    this.totals = this.monthlySum.map((item) => item.total);
    this.categories = this.months.map((month) => this.monthNames[month - 1]);

    this.chartOptions = {
      series: [
        {
          name: 'Monthly Total',
          color: '#7BD5AB',
          data: this.totals,
        },
      ],
      chart: {
        height: 300,
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        categories: this.categories,
      },
      Yaxis: {
        opposite: true,
        title: {
          text: 'الف جنية مصري',
          style: {
            fontSize: '12px',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
    };
  }
}
