import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../model/login.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ItemInformation } from '../model/itemInformation.model';
import { OptionSelect } from '../model/optionselect.model';
import { ItemQuarantine } from '../model/itemQuarantine.model';
import { QtyQuarantine } from '../model/qtyInvoice.model';
import { SuggestionModel } from '../model/suggestion.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class GeneralOptionsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line: typedef
  optionList(login: LoginModel) {
    // this.common._setLoading(true);
    const url = environment.apiURL + 'OptionSelection';
    return this.http.post<OptionSelect[]>(url, login, httpOptions)
      .pipe(map(response => {
        // this.common._setLoading(false);
        return response;
      }));
  }

  // tslint:disable-next-line: typedef
  itemInformation(item: ItemInformation) {
    const url = environment.apiURL + 'ItemInformation';
    return this.http.post<ItemInformation>(url, item, httpOptions)
      .pipe(map(response => {
        // this.common._setLoading(false);
        return response;
      }));
  }

  // tslint:disable-next-line: typedef
  itemQuarantine(item: ItemQuarantine) {
    const url = environment.apiURL + 'ItemInformationQuarantine';
    return this.http.post<ItemInformation>(url, item, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  // tslint:disable-next-line: typedef
  qtyQuarantine(itemInvoice: ItemQuarantine) {
    const url = environment.apiURL + 'QtyFactura';
    return this.http.post<QtyQuarantine>(url, itemInvoice, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }

  DocumentSuggestion(suggestion: SuggestionModel) {
    const url = environment.apiURL + 'GetDocumentSuggestion';
    return this.http.post<any>(url, suggestion, httpOptions)
      .pipe(map(response => {
        return response;
      }));
  }
}
