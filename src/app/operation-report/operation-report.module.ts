import { NgModule } from '@angular/core';
import { OperationReportComponent } from './components/operation-Report.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PieChartModule } from '../pie-chart/pie-chat.module';
import { LoadingModule } from '../loading/loading.module';

const routes: Routes = [
  {
    path: '',
    component: OperationReportComponent
  }
];

@NgModule({
  declarations: [
    OperationReportComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    PieChartModule,
    LoadingModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    HttpClientModule
  ]
})
export class OperationReportModule {
}
