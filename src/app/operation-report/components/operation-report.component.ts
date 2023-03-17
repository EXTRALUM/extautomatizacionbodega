import { Component, OnInit, OnDestroy } from '@angular/core';
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
          this.saveReportMOInfo();
          this.getInfoGraficos();
        }
      }
    );
  }

  chargeModelos() {
    this.vModelosEquipo = '';
    this.reporteMoModel.vListaModelsEquipo.forEach(Modelo => {
      if(this.vModelosEquipo !== '')
        this.vModelosEquipo += ', ';
      this.vModelosEquipo += Modelo.vNombreModelo;
    });
  }

  getInfoByPlan() {
    this.reporteMoModel.vProdId = this.reporteMoModel.vNumPlanId;
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
    } else {
      actividadNueva.vReferencia = this.reporteMoModel.vProdId;
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
    if(this.reporteMoModel.vNumPlanId || this.reporteMoModel.vProdId) {
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
