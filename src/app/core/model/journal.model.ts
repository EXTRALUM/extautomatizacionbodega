export class Journal {
  BodegaOrigen: string;
  BodegaDestino: string;
  UbicacionOrigen: string;
  UbicacionDestino: string;
  Cantidad: number;
  ItemId: string;
  Color: string;
  Style: string;
  Size: string;
  LoteOrigen: string;
  LoteDestino: string;
  RegistraDiario: number;
  UserId: string;
  JournalId: string;

  constructor() {
    this.BodegaOrigen = '';
    this.BodegaDestino = '';
    this.UbicacionOrigen = '';
    this.UbicacionDestino = '';
    this.Cantidad = 0;
    this.ItemId = '';
    this.Color = '';
    this.Style = '';
    this.Size = '';
    this.LoteOrigen = '';
    this.LoteDestino = '';
    this.RegistraDiario = 0;
    this.UserId = '';
    this.JournalId = '';
  }
}
