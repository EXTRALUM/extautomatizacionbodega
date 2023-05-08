import { NgModule } from '@angular/core';
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
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WarrantyComponent } from './warranty/warranty.component';

const routes: Routes = [
  {
    path: '',
    component: WarrantyComponent
  }
];

@NgModule({
  declarations: [
    WarrantyComponent
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
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    HttpClientModule
  ]
})
export class WarrantyModule {
}
