import { NgModule } from '@angular/core';
import { OperationReportComponent } from './components/operation-Report.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    OperationReportComponent
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    HttpClientModule
  ]
})
export class OperationReportModule {
}
