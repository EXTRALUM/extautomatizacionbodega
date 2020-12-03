export class QuarantineHistory {

  CantMovimiento: number;
  LineNum: number;
  TipoMovimiento: string;
  CuarentenaRef: string;
  FechaMovimiento: string;
  JournalId: string;
  UserId: string;
  UserName: string;
  PurchId: string;

  constructor() {
    this.JournalId = '';
    this.LineNum = 0;
    this.PurchId = '';
    this.TipoMovimiento = '';
    this.UserId = '';
    this.UserName = '';
    this.CantMovimiento = 0;
    this.CuarentenaRef = '';
    this.FechaMovimiento = '';
  }
}
