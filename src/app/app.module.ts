import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LayoutComponent,
    FooterComponent,
    ModalInformationComponent,
    ModalLocationComponent,
    ModalConfirmComponent,
    ModalReceiveComponent
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
    MatListModule
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
