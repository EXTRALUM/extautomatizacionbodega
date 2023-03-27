import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataMessageModel } from '../../model/dataMessage.model';

@Component({
  selector: 'app-modal-information',
  templateUrl: './modal-information.component.html',
  styleUrls: ['./modal-information.component.scss']
})
export class ModalInformationComponent implements OnInit {

  icon: any;
  labelTitile: string;
  textDescription: string;
  msjs: any;
  status: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dataMessage: DataMessageModel) {
    if (this.dataMessage !== null && this.dataMessage !== undefined) {
      this.labelTitile = this.dataMessage.labelTitile;
      this.textDescription = this.dataMessage.textDescription;
      this.msjs = this.textDescription.split("<br>");
      this.status = this.dataMessage.status;
    } else {
      this.labelTitile = 'Lo sentimos parece que algo anda mal';
    }
  }

  ngOnInit(): void {
  }

}
