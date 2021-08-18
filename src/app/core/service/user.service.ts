import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginModel } from '../model/login.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
  }

  // tslint:disable-next-line: typedef
  loginUser(model: LoginModel) {
    // this.common._setLoading(true);
    const url = environment.apiURL + 'Login';
    return this.http.post<any>(url, model, httpOptions)
      .pipe(map(response => {
        // this.common._setLoading(false);
        return response;
      }));
  }

}
