import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuarantineHistory } from 'src/app/core/model/quarantineHistory.model';
import { QuarantineParm } from 'src/app/core/model/qurantineParm.model';
import { JournalService } from 'src/app/core/service/journal.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalInformationComponent } from 'src/app/core/modal/modal-information/modal-information.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  params: any;
  vQuarantineParm: QuarantineParm;
  vQuarantineHistory: QuarantineHistory[];
  displayedColumns: string[];
  loading: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private journal: JournalService,
    private location: Location,
    private dialog: MatDialog,
    ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      this.params = params;
      this.loading = true;
      this.manageParams();
    });
  }

  // tslint:disable-next-line: typedef
  manageParams() {
    if (this.params.QuarantineParm !== undefined) {
      this.vQuarantineParm = JSON.parse(this.params.QuarantineParm);
      this.journal.QuarantineHistory(this.vQuarantineParm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        responseQuarantine => {
            this.loading = false;
            if (responseQuarantine !== null) {
              this.vQuarantineHistory = responseQuarantine;
              // tslint:disable-next-line: max-line-length
              // this.displayedColumns = ['PurchId', 'LineNum', 'TipoMovimiento', 'FechaMovimiento', 'CantMovimiento', 'UserId', 'UserName', 'JournalId', 'CuarentenaRef'];
            } else {
              this.modelInformation('error', 'No se encontró información relacionada al Pedido de Compra y el número de línea');
            }
          }
        );
    }
  }

  // tslint:disable-next-line: typedef
  modelInformation(typeMessage, message) {
    let status = '';
    let title = '';

    if (typeMessage === 'Info') {
      status = 'success';
      title = 'Información';
    } else if (typeMessage === 'Error') {
      status = 'error';
      title = 'Error';
    }
    const data = {
      // tslint:disable-next-line: object-literal-shorthand
      status: status,
      labelTitile: title,
      textDescription: message
    };
    const dialogRef = this.dialog.open(ModalInformationComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      data: data,
      minWidth: '70vw', maxWidth: '70vw', minHeight: '60vh', maxHeight: '60vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.addPanelClass('ocultar-modal');
      setTimeout(() => {
        this.dialog.closeAll();
      }, 300);
    });
  }

  // tslint:disable-next-line: typedef
  goBackAction() {
    this.location.back();
  }
}
