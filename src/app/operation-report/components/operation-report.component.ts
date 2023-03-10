import { Component, OnInit, OnDestroy } from '@angular/core';
import { reporteMO } from 'src/app/core/model/reporteMO.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OperationReportService } from 'src/app/core/service/operationReport.service';
import { actividadAct } from 'src/app/core/model/actividadAct.model';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
  styleUrls: ['./operation-report.component.scss']
})

export class OperationReportComponent implements OnInit, OnDestroy {
  reporteMoModel: reporteMO = new reporteMO();
  vModelosEquipo: string = '';
  private unsubscribe$ = new Subject<void>();
  vTiposReporte: string[] = [];

  constructor(
    private operationRepService: OperationReportService
  ) { }

  ngOnDestroy(): void {    
  }

  ngOnInit(): void {
    this.getTiposReporte();
    debugger;
    console.log(this.reporteMoModel.vEquipoTrabajoId);
  }

  getInfoEquipo() {
    this.operationRepService.getInfoEquipo(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.reporteMoModel = Object.assign(response);
          this.vModelosEquipo = '';
          this.reporteMoModel.vListaModelsEquipo.forEach(Modelo => {
            if(this.vModelosEquipo !== '')
              this.vModelosEquipo += ', ';
            this.vModelosEquipo += Modelo.vNombreModelo;
          });
        }
      }
    );
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
        }
      }
    );
  }

  getTiposReporte() {
    this.operationRepService.getTiposReporte(this.reporteMoModel)
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
    this.vModelosEquipo = "";
    this.getInfoByProd();
  }

  pauseOpr() {
    this.operationRepService.cerrarActividad(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.vTiposReporte = response;
        }
      }
    );
  }    

  startOpr(_actividad, _tipoAct) {
    let actividadNueva = new actividadAct();
    actividadNueva.vActividad = _actividad

    if(_tipoAct === 'Opr') {
        if(this.reporteMoModel.vTipoReporte === this.vTiposReporte[0])//Plan
          actividadNueva.vReferencia = this.reporteMoModel.vNumPlanId;
        else
          actividadNueva.vReferencia = '';
    }

    this.reporteMoModel.ActividadAct = actividadNueva;
    
    this.operationRepService.getTiposReporte(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.vTiposReporte = response;
        }
      }
    );
  }

  endOpr() {
    this.operationRepService.reportarMO(this.reporteMoModel)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        if (response) {
          this.vTiposReporte = response;
        }
      }
    );
  }

  insertDelay() {

  }
}
