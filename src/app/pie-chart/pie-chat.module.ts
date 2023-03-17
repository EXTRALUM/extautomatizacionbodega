import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
    declarations: [
      PieChartComponent
    ],
    entryComponents: [
        PieChartComponent
    ],
    exports: [
        PieChartComponent
    ],
    imports: [
    ]
  })
  export class PieChartModule { }