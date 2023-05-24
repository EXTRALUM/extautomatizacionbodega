import { Component, OnInit } from '@angular/core';
import { warranty } from 'src/app/core/model/warranty.model';
import { NumerodeSerie } from 'src/app/core/model/NumerodeSerie.model';
import { WarrantyService } from 'src/app/core/service/warranty.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginModel } from 'src/app/core/model/login.model';
import { utiles } from 'src/environments/utiles';
import { Console } from 'console';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {
  Modo: boolean;
  NumeroDeSerieNuevo: string;
  IndexArray: number;
  loginModel = new LoginModel();
  warrantyModel: warranty = new warranty();
  warrantyInsertModel: warranty = new warranty();
  vNumerodeSerieList: NumerodeSerie[] = [];
  private unsubscribe$ = new Subject<void>();
  vData: any;
  constructor( 
    private warrantyService: WarrantyService)
     { }

  ngOnInit(): void {
    this.Modo = true;
    this.NumeroDeSerieNuevo="";
  }

  getGarantia() {
    if(this.warrantyModel.vCustInvoiceID !== ""){
      this.loginModel = utiles.getCacheLogin();
      this.warrantyModel.vColaboradorNombre = this.loginModel.UserId;   
      this.warrantyService.getGarantia(this.warrantyModel)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            if (response) {
              this.warrantyModel = Object.assign(response);
              this.HabilitarBotones();
            }
          }
        );
    }else{
      this.HabilitarBotones();
    }
  }
  
  HabilitarBotones(){
    let fecha: Date = new Date(this.warrantyModel.vFechaImpresion);
    let FechaString: string = fecha.toDateString();
    if(this.warrantyModel.vCustInvoiceID !== ""){
      if(FechaString === "Sun Dec 31 1899"){
        this.Modo = false;
      }
      else{
        this.Modo = true;
      }
    }else{
      this.Modo = true;
    }
  }

  DeshabilitarBotones(){
      this.Modo = true;
  }

  InsertarGarantia(){
    if(this.warrantyModel.vCustInvoiceID !== ""){
      this.loginModel = utiles.getCacheLogin();
      this.ObtenerCantidadNS();
      this.warrantyModel.vColaboradorNombre = this.loginModel.UserId;
      this.warrantyService.insertGarantia(this.warrantyModel)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
        response => {
        if (response) {
            this.warrantyModel = Object.assign(response);
            this.HabilitarBotones();
          }
        }
      );
    }
  }

  ObtenerCantidadNS(){
    this.warrantyModel.vCantidadNS = this.warrantyModel.vListaNumeroDeSerie.length;  
  }

  AgregarNS(){
    if(this.NumeroDeSerieNuevo !=="")
    {
      this.warrantyModel.vListaNumeroDeSerie.push({vNumeroDeSerie: this.NumeroDeSerieNuevo });
      this.NumeroDeSerieNuevo ="";
      this.ObtenerCantidadNS();
    }
  }

  EliminarNS(NumerodeSerieList: NumerodeSerie){
    this.IndexArray = this.warrantyModel.vListaNumeroDeSerie.indexOf(NumerodeSerieList);
    this.warrantyModel.vListaNumeroDeSerie = this.warrantyModel.vListaNumeroDeSerie.filter(item => item !== NumerodeSerieList);
    this.ObtenerCantidadNS();
  }

  clearFactura() {
    this.warrantyModel.vCustInvoiceID = '';
    this.warrantyModel.vCantidadNS = 0;
    this.warrantyModel.vClienteNombre ='';
    this.warrantyModel.vColaboradorNombre ='';
    this.warrantyModel.vListaNumeroDeSerie=[];
    this.warrantyModel.vRefRecIDInvoice =0;
    this.warrantyModel.vSalesID ='';
    this.getGarantia();
  }


}
