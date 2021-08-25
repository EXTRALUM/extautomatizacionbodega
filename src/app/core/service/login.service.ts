import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginModel } from '../model/login.model';

/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line: typedef
  loginUser(model: LoginModel) {
    debugger;
    // this.common._setLoading(true);
    const url = environment.apiURL + 'Login';
    return this.http.post<any>(url, model, httpOptions)
      .pipe(map(response => {
        // this.common._setLoading(false);
        return response;
      }));
  }
}
