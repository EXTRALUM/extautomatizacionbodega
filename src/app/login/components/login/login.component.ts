import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/core/modal/modal-error/modal-error.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../../../core/model/login.model';
import { LoginService } from 'src/app/core/service/login.service';
import { environment } from 'src/app/core/enviroment/enviroment';
import { utiles } from 'src/environments/utiles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loginForm: FormGroup;
  loginModel: LoginModel = new LoginModel();
  submitted = false;
  errorLogin = '';
  // public http: HttpClient = new HttpClient();

  public dialog: MatDialog;
  // public loginService: LoginService;// = new LoginService(this.http);

  constructor(
    public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    utiles.clearAllCache();

    this.loginForm = this.fb.group({
      Password: ['', Validators.compose([Validators.required])],
      UserId: ['', Validators.compose([Validators.required])]
    });
  }

  // tslint:disable-next-line: typedef
  setUserModel() {
    this.loginModel.UserId = this.loginForm.get('UserId').value;
    this.loginModel.Password = this.loginForm.get('Password').value;
  }

  // tslint:disable-next-line: typedef
  getErrorMessage(control) {
    switch (control) {
      case 'Password': {
        return this.loginForm.controls.Password.hasError('required') ? 'Campo requerido.' : '';
        break;
      }
      case 'Email': {
        return this.loginForm.controls.UserId.hasError('required') ? 'El campo de usuario es requerido.' : '';
        break;
      }
    }
  }

  // tslint:disable-next-line: typedef
  login() {
    this.setUserModel();
    this.loginService.loginUser(this.loginModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        responseLogin => {
          if (responseLogin.loginProcess === true) {
            // tslint:disable-next-line: prefer-const
            let loginCache = new LoginModel();
            loginCache.UserId = this.loginModel.UserId;
            utiles.createCacheUser(loginCache);
            this.router.navigate(['home']);
          } else {
            this.errorLogin = 'Error, datos de ingreso no son correcto. Favor validar la información';
          }
        }
      );
  }

  // tslint:disable-next-line: typedef
  // opendialogAlert(title, message) {
  //   const dialogRef = this.dialog.open(ModalErrorComponent, {
  //     data: {
  //       labelTitile: title,
  //       icon: 'error',
  //       textDescription: message,
  //       status: 'error'
  //     },
  //     minWidth: '30vw', maxWidth: '95vw', maxHeight: '95vh', minHeight: '30vh', disableClose: true
  //   });
  // }
}
