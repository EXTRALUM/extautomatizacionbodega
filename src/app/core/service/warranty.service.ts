import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';
import { warranty } from '../model/warranty.model';

/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {

  constructor(public http: HttpClient, private common: CommonService) { }

  getGarantia(warranty) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'getGarantia';
    return this.http.post<warranty[]>(url, warranty, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }

  insertGarantia(warranty) {
    this.common._setLoading(true);
    const url = environment.apiURL + 'insertGarantia';
    return this.http.post<warranty[]>(url, warranty, httpOptions)
      .pipe(map(response => {
        this.common._setLoading(false);
        return response;
      }));
  }
  
}