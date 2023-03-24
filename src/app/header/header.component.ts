import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { LoginModel } from '../core/model/login.model';
import { OptionSelect } from '../core/model/optionselect.model';
import { GeneralOptionsService } from '../core/service/general-options.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  optionSelect: OptionSelect[];
  optionSelectFormat: OptionSelect[];

  constructor(
    private router: Router,
    private generalOption: GeneralOptionsService
  ) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  getOptionSelect() {
    this.optionSelect = [];
    let loginModel = new LoginModel();

    loginModel = utiles.getCacheLogin();

    if (loginModel) {
      this.generalOption.optionList(loginModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        responseOptions => {
          if (responseOptions) {
            this.optionSelect = responseOptions;
          }
        }
      );

      this.optionSelect.forEach(element => {
        // tslint:disable-next-line: prefer-const
        let singleOption = new OptionSelect();
        singleOption.OptionName = element.OptionName;
        singleOption.OptionDirection = element.OptionDirection === 'Cuarentena' ? '/quarantine-transfer' : element.OptionDirection === 'Transferencia de Almacén' ? '/transfer-journal' : '';
        this.optionSelectFormat.push(singleOption);
      });

    }
  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
