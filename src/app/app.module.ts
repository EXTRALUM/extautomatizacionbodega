import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpinterceptorService } from './core/helper/interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalInformationComponent } from './core/modal/modal-information/modal-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LoadingModule } from './loading/loading.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalLocationComponent } from '../app/core/modal/modal-location/modal-location.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './core/modal/modal-confirm/modal-confirm.component';
import { ModalReceiveComponent } from './core/modal/modal-receive/modal-receive.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ModalDelaysComponent } from './core/modal/modal-delays/modal-delays.component';
import { ModalTeamModelsComponent } from './core/modal/modal-teamModels/modal-teamModels.component';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ModalInformationComponent,
    ModalLocationComponent,
    ModalConfirmComponent,
    ModalReceiveComponent,
    ModalDelaysComponent,
    ModalTeamModelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    LoadingModule,
    NgxLoadingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    LayoutModule,
    MatSelectModule
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
