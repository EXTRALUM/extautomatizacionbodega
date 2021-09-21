import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { DocumentLinesModel } from '../../model/documentLines.model';
import { LinesParams } from '../../model/linesParams.model';
import { LinesToReceive } from '../../model/linesToReceive.model';
import { LoginModel } from '../../model/login.model';
import { JournalService } from '../../service/journal.service';

@Component({
  selector: 'app-modal-receive',
  templateUrl: './modal-receive.component.html',
  styleUrls: ['./modal-receive.component.scss']
})
export class ModalReceiveComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  purchId: string;
  invoiceId: string;
  linesParams: LinesParams = new LinesParams();
  LinesToReceive: LinesToReceive[];
  userLogin: LoginModel = new LoginModel();

  constructor(@Inject(MAT_DIALOG_DATA)public dataMessage: DocumentLinesModel, private journalService: JournalService, public dialogRef: MatDialogRef<ModalReceiveComponent>) {
    if (this.dataMessage !== undefined) {
      this.purchId = this.dataMessage.purchId;
      this.invoiceId = this.dataMessage.invoiceId;

      this.linesParams.PurchId = this.purchId;
      this.linesParams.InvoiceId = this.invoiceId;
      this.userLogin = utiles.getCacheLogin();
      this.linesParams.UserId = this.userLogin.UserId;
    }
  }

  ngOnInit(): void {

    this.getDocumentLinesToReceive();
  }

  getDocumentLinesToReceive() {
    //this.purchId;
    //this.invoiceId;

    this.journalService.LinesToReceive(this.linesParams)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      responseLines => {
        if (responseLines) {
          this.LinesToReceive = responseLines;
        }
      }
    );
  }

  saveLineInformationToReceive(event: LinesToReceive) {
    this.closeDialog(event);
  }

  printLog(event: LinesToReceive) {
    console.log('Este es el pedido de compra');
    console.log(event.PedidoCompra);
  }

  closeDialog(event: LinesToReceive) {
    this.dialogRef.close({
      event: 'close',
      data: event
    });
  }

}
