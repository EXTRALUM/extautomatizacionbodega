import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { LoginRespuestaModel } from '@core/model/login.respuesta.model';
import { LoginModel } from '../model/login.model';

const methodAuthenticationApi = 'api/Token/Token';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

export class AuthenticationService {

    // private currentUserSecurity: BehaviorSubject<LoginRespuestaModel>;
    // public currentSecurity: Observable<LoginRespuestaModel>;
    private currentUserLocal: BehaviorSubject<LoginModel>;
    public currentUser: Observable<LoginModel>;

    constructor(private http: HttpClient) {
        // this.currentUserLocal = new BehaviorSubject<LoginModel>(utiles.getInfoAuthorization());
        // this.currentUser = this.currentUserLocal.asObservable();
        // this.currentUserSecurity = new BehaviorSubject<LoginRespuestaModel>(utiles.obtenerInfoUsuario());
        // this.currentSecurity = this.currentUserSecurity.asObservable();
    }

}
