import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginModel } from 'src/app/core/model/login.model';
import { OptionSelect } from 'src/app/core/model/optionselect.model';
import { GeneralOptionsService } from 'src/app/core/service/general-options.service';
import { utiles } from 'src/environments/utiles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  optionSelect: OptionSelect[];
  optionSelectFormat: OptionSelect[];

  constructor(
    private generalOption: GeneralOptionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOptionSelect();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
        singleOption.OptionDirection = element.OptionDirection === 'Cuarentena' ? 'quarantine-transfer' : element.OptionDirection === 'Transferencia de Almacén' ? 'transfer-journal' : '';
        this.optionSelectFormat.push(singleOption);
      });

    }
  }

  // tslint:disable-next-line: typedef
  goToDirection(item: string) {
    this.router.navigate([item]);
  }
}
