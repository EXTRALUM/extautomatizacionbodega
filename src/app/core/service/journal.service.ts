import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { environment } from '../../../environments/environment';
import { Journal } from '../model/journal.model';
import { JournalResponse } from '../model/journalResponse.model';
import { LocationModel } from '../model/location.model';
import { LoginModel } from '../model/login.model';
import { Quarantine } from '../model/quarantine.model';
import { QuarantineHistory } from '../model/quarantineHistory.model';
import { QuarantineResponse } from '../model/quarantineResponse.model';
import { QuarantineParm } from '../model/qurantineParm.model';
import { ValidationModel } from '../model/validation.model';
import { CommonService } from './common.service';

/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(public http: HttpClient, private common: CommonService) { }

  // tslint:disable-next-line: typedef
  LocationAvailable() {
    const url = environment.apiURL + 'LocationAvailable';
    // tslint:disable-next-line: prefer-const
    let login = new LoginModel();
    login = utiles.getCacheLogin();
    return this.http.post<LocationModel[]>(url, login, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  // tslint:disable-next-line: typedef
  JournalProcess(journal: Journal) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'JournalProcess';
    return this.http.post<JournalResponse>(url, journal, httpOptions)
    .pipe(map(response => {
      this.common._setLoading(false);
      return response;
    }));
  }

  // tslint:disable-next-line: typedef
  QuarantineProcess(quarantine: Quarantine) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'QuarantineProcess';
    return this.http.post<QuarantineResponse>(url, quarantine, httpOptions)
    .pipe(map(response => {
      this.common._setLoading(false);
      return response;
    }));
  }

  // tslint:disable-next-line: typedef
  QuarantineHistory(quarantineParm: QuarantineParm) {
    const url = environment.apiURL + 'QuarantineHistory';
    let listLocal;
    return this.http.post<QuarantineHistory[]>(url, quarantineParm, httpOptions)
    .pipe(map(response => {
      if (response) {
        listLocal = response;
      } else {
        listLocal = null;
      }
      return listLocal;
    }));
  }

  ValidationValues(validationParm: ValidationModel) {
    const url = environment.apiURL + 'ValidateValues';
    let listLocal;
    return this.http.post<ValidationModel>(url, validationParm, httpOptions)
    .pipe(map(response => {
      if (response) {
        listLocal = response;
      } else {
        listLocal = null;
      }
      return listLocal;
    }));
  }
}
