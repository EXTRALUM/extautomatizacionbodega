import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { reporteMO } from 'src/app/core/model/reporteMO.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OperationReportService } from 'src/app/core/service/operationReport.service';
import { actividadAct } from 'src/app/core/model/actividadAct.model';
import { utiles } from 'src/environments/utiles';
import { MatDialog } from '@angular/material/dialog';
import { ModalDelaysComponent } from 'src/app/core/modal/modal-delays/modal-delays.component';
import { ModalTeamModelsComponent } from 'src/app/core/modal/modal-teamModels/modal-teamModels.component';
import { ModalInformationComponent } from 'src/app/core/modal/modal-information/modal-information.component';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
  styleUrls: ['./operation-report.component.scss']
})

export class OperationReportComponent implements OnInit, OnDestroy {
  reporteMoModel: reporteMO = new reporteMO();
  private unsubscribe$ = new Subject<void>();
  vTiposReporte: string[] = [];
  vPendChartDataByReport: any;
  vPendChartData: any;
  vCompleteChartData: any;
  showCharts: boolean;

  @ViewChild('PlanProdTxt') vPlanProdTxt: MatInput;
  @ViewChild('ProdTxt') vProdTxt: MatInput;
  @ViewChild('LoteTxt') vLoteTxt: MatInput;

  constructor(
    private operationRepService: OperationReportService,
    public dialog: MatDialog,
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTeamModelsComponent, {
      data: {labelTitile: 'Modelos Asociados', reporteMO: this.reporteMoModel},
    });
  }

  ngOnDestroy(): void {    
  }

  ngOnInit(): void {
    let cacheReportModel = utiles.getCacheReportMO();
    if(cacheReportModel !== undefined && cacheReportModel !== null)
      this.reporteMoModel = cacheReportModel;
    this.getTiposReporte();
    this.getInfoGraficos();
  }

  getInfoEquipo() {
    this.operationRepService.getInfoEquipo(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.reporteMoModel = Object.assign(response);

          if(this.reporteMoModel.vEquipoTrabajoRefRecId != 0)
          {
            //Se solicita que de manera default traiga reporte por plan
            if(this.reporteMoModel.vPlanProdRefRecId === 0
            && this.reporteMoModel.vProdTableRefRecId === 0
            && this.reporteMoModel.vLotePerfilRefRecId === 0)
            {
              this.reporteMoModel.vTipoReporte = this.vTiposReporte[0];//Plan
            }
            
            if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[0])//Plan
              this.vPlanProdTxt.focus();
            else if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[1])//Prod
              this.vProdTxt.focus();
            else if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[2])//Lote
              this.vLoteTxt.focus();
          }

          this.saveReportMOInfo();
          this.getInfoGraficos();
        }
      }
    );
  }

  getInfoByPlan() {
    this.reporteMoModel.vProdId = this.reporteMoModel.vNumPlanId;
    this.getInfoByProd();
  }

  getInfoByLoteOptimiza() {
    this.reporteMoModel.vProdId = this.reporteMoModel.vLotePerfilId;
    this.getInfoByProd();
  }

  getInfoByProd() {
    this.operationRepService.getInfoByProd(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.reporteMoModel = Object.assign(response);
          this.saveReportMOInfo();
          this.getInfoGraficos();
        }
      }
    );
  }

  getTiposReporte() {
    this.operationRepService.getTiposReporte()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.vTiposReporte = response;
        }
      }
    );
  }

  clearEquipo() {
    this.reporteMoModel.vEquipoTrabajoId = '';
    this.getInfoEquipo();
  }

  clearProd() {
    this.reporteMoModel.vProdId = '';
    this.getInfoByProd();
  }

  clearScreen() {
    this.reporteMoModel = new reporteMO()
    
    this.getInfoByProd();
  }

  pauseOpr(openDialog = false) {
    if(openDialog) {
      const dialogRef = this.dialog.open(ModalDelaysComponent, {
        data: {
          labelTitile: 'Motivo de Retraso',
        },
        panelClass: ['without-padding'],
          minWidth: '55vh',
          maxWidth: '60vh',
          maxHeight: '74vh',
          minHeight: '40vh',
          disableClose: true
      });
      dialogRef.componentInstance.responseSelect
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if(result !== undefined && result.vRetraso !== '') {
          if(result.vContabilizaTiempo)
            this.startOpr(result.vRetraso, 'Retraso');
          else
            this.pauseOpr(false);
          
          this.saveReportMOInfo();
        }
      });
    } else {
      this.operationRepService.cerrarActividad(this.reporteMoModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          if (response) {
            this.reporteMoModel = Object.assign(response);
            this.saveReportMOInfo();
          }
        }
      );
    }
  }    

  startOpr(_actividad, _tipoAct) {
    let actividadNueva = new actividadAct();
    actividadNueva.vOperacion = this.reporteMoModel.vOprId

    actividadNueva.vTipoReferencia = this.reporteMoModel.vTipoReporte;
    if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[0]) {//Plan
      actividadNueva.vReferencia = this.reporteMoModel.vNumPlanId;
      actividadNueva.vLote = this.reporteMoModel.vLote;
    } else if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[1]) {//Prod
      actividadNueva.vReferencia = this.reporteMoModel.vProdId;
    } else if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[2]) {//Lote Perfil
      actividadNueva.vReferencia = this.reporteMoModel.vLotePerfilId;
    }

    if(_tipoAct === 'Retraso') {
      actividadNueva.vRetraso = _actividad;
    }

    this.reporteMoModel.ActividadAct = actividadNueva;
    this.operationRepService.iniciarActividad(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.reporteMoModel = Object.assign(response);
          this.saveReportMOInfo();
        }
      }
    );

    this.saveReportMOInfo();
  }

  endOpr() {
    this.operationRepService.reportarMO(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        debugger;
        if (response) {
          this.reporteMoModel = Object.assign(response);
          this.saveReportMOInfo();
          this.getInfoGraficos();
          if(this.reporteMoModel.vMsjReporteMO !== undefined 
          && this.reporteMoModel.vMsjReporteMO !== null
          && this.reporteMoModel.vMsjReporteMO !== "")
          {
            const data = {
              status: 'error',
              labelTitile: 'Error',
              textDescription: this.reporteMoModel.vMsjReporteMO
            };
              
            const dialogRef = this.dialog.open(ModalInformationComponent, {
              data: data,
              minWidth: '90vw', maxWidth: '90vw', minHeight: '40vh', maxHeight: '40vh'
            });
          }
        }
      }
    );
  }

  getInfoPendGrafico() {
    this.operationRepService.getInfoPendGrafico(this.reporteMoModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          if (response) {
            this.vPendChartData = response;
          }
        }
      );
  }

  getInfoPendGraficoByReport() {
    this.operationRepService.getInfoPendGraficoByReport(this.reporteMoModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          if (response) {
            this.vPendChartDataByReport = response;
          }
        }
      );
  }

  getInfoMetaGrafico() {
    this.operationRepService.getInfoMetaGrafico(this.reporteMoModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          if (response) {
            this.vCompleteChartData = response;
          }
        }
      );
  }

  getInfoGraficos() {
    if(this.reporteMoModel.vNumPlanId || this.reporteMoModel.vProdId || this.reporteMoModel.vLotePerfilId) {
      this.getInfoPendGraficoByReport();
      this.getInfoPendGrafico();
      this.getInfoMetaGrafico();
      this.showCharts = true;
    } else {
      this.vPendChartDataByReport = {};
      this.vPendChartData = {};
      this.vCompleteChartData = {};
      this.showCharts = false;
    }
  }

  saveReportMOInfo() {
    utiles.clearCacheReportMO();
    utiles.createCacheReportMO(this.reporteMoModel);
  }
}
