import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { CommonService } from '@shared/service/common.service';
// import { utiles } from '@utl/environment';
// import { CommonService } from '@shared/service/common.service';


@Injectable()
export class HttpinterceptorService implements HttpInterceptor {

    constructor(
        // private commonService: CommonService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // tslint:disable-next-line:prefer-const
        let token = '';

        // tslint:disable-next-line:prefer-const
        //  let infoAuthorization = utiles.getCacheAuthorization();
        // if (infoAuthorization !== undefined && infoAuthorization !== null) {
        //     token = infoAuthorization.token;
        // }

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.url.includes('Upload')) {
            if (!request.headers.has('Content-Type')) {
                // request = request.clone({ headers: request.headers.set('Accept-Encoding', 'gzip') });
            }

            // request = request.clone({ headers: request.headers.set('Accept-Encoding', 'gzip') });

        }


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // this.commonService.onErrorModal(error);
                return throwError(error);
            }));
    }

}
