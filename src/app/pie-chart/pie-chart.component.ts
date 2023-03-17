import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Console } from 'console';
Chart.register(...registerables);
declare var $: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() chartName
  @Input() chartData
  ngOnChanges(data: any) {
    if(data.chartData !== undefined)
      this.chartData = data.chartData.currentValue;
    if(data.chartName !== undefined)
      this.divName = 'Div'+data.chartName.currentValue;
    this.initializeChart();
  }

  divName: string;

  constructor() { }

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    var canvas = document.getElementById(this.divName);
    if(canvas !== null) {
      debugger;
      canvas.innerHTML = '<canvas id="'+this.chartName+'"></canvas>';
      var myChart = new Chart(this.chartName, {
        type: 'pie',
        data: this.chartData,
        options: {
          plugins: {
            tooltip: {
              enabled: true
            },
            datalabels: {
              color: '#ffffff',
              textAlign: 'center',
              formatter: (value, context) => {
                const datapoints = context.chart.data.datasets[0].data;
                function totalsum(total, datapoint) {
                  return total + datapoint;
                }
                const totalValue = datapoints.reduce(totalsum, 0);
                const percent = (value * 100 / totalValue)
                if(percent > 0)
                  return percent.toFixed(0)+'%';
                else
                  return '';
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    }
  }
}
