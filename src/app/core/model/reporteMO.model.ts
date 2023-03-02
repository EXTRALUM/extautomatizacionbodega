import { modeloEquipo } from "./modeloEquipo.model";

export class reporteMO {
    vEquipoTrabajoId: string;
    vNombreEquipo: string;
    vCantTrabajadores:number;
    vOprId: string;
    vNombreOpr: string;
    vProdId: string;
    ListaModelsEquipo: modeloEquipo[];
    vEquipoTrabajoRefRecId: bigint;
    vTipoReporte: string;
    vPlanProdRefRecId: bigint;
    vNumPlanId: string;
    vLote: string;
    vProdTableRefRecId: bigint;
    vRouteOprTableRefRecId: bigint;
    vCantReportada:number;
    vCantAReportar:number;
    
    constructor() {
        this.vEquipoTrabajoId = '';
        this.vNombreEquipo = '';
        this.vCantTrabajadores = 0;
        this.vOprId = '';
        this.vNombreOpr = '';
        this.vProdId = '';
        this.ListaModelsEquipo = [];
        this.vEquipoTrabajoRefRecId = BigInt(0);
        this.vTipoReporte = '';
        this.vPlanProdRefRecId = BigInt(0);
        this.vNumPlanId = '';
        this.vLote = '';
        this.vProdTableRefRecId = BigInt(0);
        this.vRouteOprTableRefRecId = BigInt(0);
        this.vCantReportada = 0;
        this.vCantAReportar = 0;
    }
}