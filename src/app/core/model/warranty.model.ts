import { NumerodeSerie } from "./NumerodeSerie.model";

export class warranty {

    vCantidadNS: number;
    vClienteNombre: string;
    vColaboradorNombre: string;
    vCustInvoiceID: string;
    vSalesID: string;
    vFechaImpresion: Date;
    vFechaGarantia: Date;
    vRefRecIDInvoice: number;
    vListaNumeroDeSerie: NumerodeSerie[];
    
    constructor() {
        this.vCantidadNS = 0;
        this.vClienteNombre = '';
        this.vColaboradorNombre = '';
        this.vCustInvoiceID = '';
        this.vSalesID = '';
        this.vFechaImpresion = new Date();
        this.vFechaGarantia = new Date();
        this.vRefRecIDInvoice = 0;
        this.vListaNumeroDeSerie = [];
    }
}