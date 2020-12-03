import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from '../../../core/service/common.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  //#region variables
  loading = false;

  constructor(
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.common._setLoading(false);
    this.common.loadingService
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.loading = data;
    });
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
