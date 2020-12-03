import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  closeDialog(event: number) {
    this.dialogRef.close({
      event: 'close',
      data: event
    });
  }

}
