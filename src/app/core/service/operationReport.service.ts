import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { environment } from '../../../environments/environment';
import { reporteMO } from '../model/reporteMO.model';
import { CommonService } from './common.service';

/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class OperationReportService {

  constructor(public http: HttpClient, private common: CommonService) { }

  getInfoEquipo(reporteMO) {
    const url = environment.apiURL + 'getInfoEquipo';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  getInfoByProd(reporteMO) {
    debugger;
    const url = environment.apiURL + 'getInfoByProd';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  getTiposReporte(reporteMO) {
    const url = environment.apiURL + 'getTiposReporte';
    return this.http.post<string[]>(url, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  reportarMO(reporteMO) {
    const url = environment.apiURL + 'reportarMO';
    return this.http.post<string[]>(url, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  iniciarActividad(reporteMO) {
    const url = environment.apiURL + 'iniciarActividad';
    return this.http.post<string[]>(url, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  cerrarActividad(reporteMO) {
    const url = environment.apiURL + 'cerrarActividad';
    return this.http.post<string[]>(url, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }
}