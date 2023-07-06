import { modeloEquipo } from "./modeloEquipo.model";
import { actividadAct } from "./actividadAct.model";

export class reporteMO {
    vEquipoTrabajoId: string;
    vNombreEquipo: string;
    vCantTrabajadores:number;
    vOprId: string;
    vNombreOpr: string;
    vProdId: string;
    vListaModelsEquipo: modeloEquipo[];
    vEquipoTrabajoRefRecId: number;
    vMetaDiaria: number;
    vTipoReporte: string;
    vPlanProdRefRecId: number;
    vNumPlanId: string;
    vLote: string;
    vProdTableRefRecId: number;
    vRouteOprTableRefRecId: number;
    vCantProd: number;
    vCantReportada: number;
    vCantAReportar: number;
    vCantExcluida: number;
    vMsjReporteMO: string;
    ActividadAct: actividadAct
    
    constructor() {
        this.vEquipoTrabajoId = '';
        this.vNombreEquipo = '';
        this.vCantTrabajadores = 0;
        this.vOprId = '';
        this.vNombreOpr = '';
        this.vProdId = '';
        this.vListaModelsEquipo = [];
        this.vEquipoTrabajoRefRecId = 0;
        this.vMetaDiaria = 0;
        this.vTipoReporte = '';
        this.vPlanProdRefRecId = 0;
        this.vNumPlanId = '';
        this.vLote = '';
        this.vProdTableRefRecId = 0;
        this.vRouteOprTableRefRecId = 0;
        this.vCantProd = 0;
        this.vCantReportada = 0;
        this.vCantAReportar = 0;
        this.vCantExcluida = 0;
        this.vMsjReporteMO = '';
        this.ActividadAct = new actividadAct(); 
    }
}