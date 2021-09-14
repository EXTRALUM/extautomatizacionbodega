export class LinesToReceive {

  PedidoCompra: string;
  NumLinea: number;
  ItemId: string;
  ItemName: string;
  BodegaId: string;
  BodegaNombre: string;
  CantidadRecibir: number;
  Color: string;
  Style: string;
  Size: string;
  RefRecIdWMS: number;

  constructor() {
    this.PedidoCompra = '';
    this.NumLinea = 0;
    this.ItemId = '';
    this.ItemName = '';
    this.BodegaId = '';
    this.BodegaNombre = '';
    this.CantidadRecibir = 0;
    this.Color = '';
    this.Style = '';
    this.Size = '';
    this.RefRecIdWMS = 0;
  }
}