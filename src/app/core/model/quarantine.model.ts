export class Quarantine {

  Bodega: string;
  CantidadTrasladar: number;
  FacturaProveedor: string;
  NumLinea: number;
  PedidoCompra: string;
  UbicacionDestino: string;
  UserId: string;
  RefRecIdWMS: number;

  constructor() {
    this.Bodega = '';
    this.CantidadTrasladar = 0;
    this.FacturaProveedor = '';
    this.NumLinea = 0;
    this.PedidoCompra = '';
    this.UbicacionDestino = '';
    this.UserId = '';
    this.RefRecIdWMS = 0;
  }
}
