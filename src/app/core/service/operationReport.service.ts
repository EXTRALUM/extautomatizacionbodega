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
    this.common._setLoading(true);
    const url = environment.apiURL + 'getInfoEquipo';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  getInfoByProd(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getInfoByProd';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  getTiposReporte() {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getTiposReporte';
    return this.http.post<string[]>(url, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  reportarMO(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'reportarMO';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  iniciarActividad(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'iniciarActividad';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  cerrarActividad(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'cerrarActividad';
    return this.http.post<reporteMO[]>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  getInfoPendGrafico(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getInfoPendGrafico';
    return this.http.post<string>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  getInfoMetaGrafico(reporteMO) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getInfoMetaGrafico';
    return this.http.post<string>(url, reporteMO, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  getRetrasos() {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getRetrasos';
    return this.http.post<[]>(url, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }
}