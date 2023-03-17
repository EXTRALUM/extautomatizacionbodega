import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperationReportService } from 'src/app/core/service/operationReport.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { retraso } from '../../model/retraso.model';

@Component({
  selector: 'app-modal-delays',
  templateUrl: './modal-delays.component.html',
  styleUrls: ['./modal-delays.component.scss']
})
export class ModalDelaysComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  vRetrasoSelect: string;
  labelTitile: string;
  listaRetrasos: retraso[] = [];
  responseSelect = new EventEmitter();
  constructor(
    private operationRepService: OperationReportService,
    public dialogRef: MatDialogRef<ModalDelaysComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMessage: any,
  ) { 
    if (this.dataMessage !== null && this.dataMessage !== undefined) {
      this.labelTitile = this.dataMessage.labelTitile;
    } else {
      this.labelTitile = 'Lo sentimos parece que algo anda mal';
    }
  }

  ngOnInit(): void {
    this.getRetrasos();
  }

  getRetrasos() {
    this.operationRepService.getRetrasos()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.listaRetrasos = response;
        }
      }
    );
  }

  addDelay() {
    this.listaRetrasos.forEach(element => {
      if(element.vRetraso === this.vRetrasoSelect) {
        this.responseSelect.emit(element);
        this.dialogRef.close();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
