import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';

import { LoginRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserService } from 'src/app/core/service/user.service';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpinterceptorService } from '../core/helper/interceptor.service';
import { LoginService } from '../core/service/login.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HttpClientModule
  ]
})
export class LoginModule {
}
