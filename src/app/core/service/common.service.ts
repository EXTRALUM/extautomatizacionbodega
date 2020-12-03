import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private countLoading = 0;
  private loading = new BehaviorSubject(false);
  loadingService = this.loading.asObservable();

  constructor() { }

  // tslint:disable-next-line: typedef
  _setLoading(item: any) {
    if (item) {
      this.countLoading++;
      if (this.countLoading === 1) {
        this.loading.next(item);
      }
    } else {
      this.countLoading--;
    }
    if (this.countLoading === 0) {
      this.loading.next(item);
    }
    if (this.countLoading <= 0) {
      this.countLoading = 0;
      this.loading.next(item);
    }
    console.log(this.countLoading);
  }
}
