import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperationReportService } from 'src/app/core/service/operationReport.service';
import { reporteMO } from '../../model/reporteMO.model';

@Component({
  selector: 'app-modal-delays',
  templateUrl: './modal-teamModels.component.html',
  styleUrls: ['./modal-teamModels.component.scss']
})
export class ModalTeamModelsComponent implements OnInit {
  labelTitile: string;
  vReporteMO: reporteMO; 
  constructor(
    public dialogRef: MatDialogRef<ModalTeamModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMessage: any,
  ) { 
    if (this.dataMessage !== null && this.dataMessage !== undefined) {
      this.labelTitile = this.dataMessage.labelTitile;
      this.vReporteMO = this.dataMessage.reporteMO;
    } else {
      this.labelTitile = 'Lo sentimos parece que algo anda mal';
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
