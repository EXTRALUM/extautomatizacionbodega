import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { ModalInformationComponent } from 'src/app/core/modal/modal-information/modal-information.component';
import { ModalLocationComponent } from 'src/app/core/modal/modal-location/modal-location.component';
import { ItemInformation } from 'src/app/core/model/itemInformation.model';
import { ItemQuarantine } from 'src/app/core/model/itemQuarantine.model';
import { LoginModel } from 'src/app/core/model/login.model';
import { QtyQuarantine } from 'src/app/core/model/qtyInvoice.model';
import { Quarantine } from 'src/app/core/model/quarantine.model';
import { QuarantineResponse } from 'src/app/core/model/quarantineResponse.model';
import { QuarantineParm } from 'src/app/core/model/qurantineParm.model';
import { GeneralOptionsService } from 'src/app/core/service/general-options.service';
import { JournalService } from 'src/app/core/service/journal.service';
import { utiles } from 'src/environments/utiles';
import { LocationModel } from '../../../core/model/location.model';
import { Location } from '@angular/common';
import { ModalReceiveComponent } from 'src/app/core/modal/modal-receive/modal-receive.component';
import { element } from 'protractor';
import { LinesToReceive } from 'src/app/core/model/linesToReceive.model';
import { SuggestionModel } from 'src/app/core/model/suggestion.model';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-quarantine-transfer',
  templateUrl: './quarantine-transfer.component.html',
  styleUrls: ['./quarantine-transfer.component.scss']
})
export class QuarantineTransferComponent implements OnInit, OnDestroy {

  itemInformation: ItemInformation = new ItemInformation();
  locationList: LocationModel[];
  private unsubscribe$ = new Subject<void>();
  bodegaOrigen: string;
  cantRecibida: number;
  cantFacturada: number;
  cantDiferencia: number;
  qtyQuarantine: QtyQuarantine;
  quarantineResponse: QuarantineResponse;
  loading: boolean;

  PurchId: string;
  InvoiceId: string;

  line: LinesToReceive = new LinesToReceive();
  suggestion: SuggestionModel = new SuggestionModel();
  filteredOptions: SuggestionModel[];
  filterListString: string[] = [];
  filterListString2: string[] = []
  filteredOptionsObs: Observable<string[]>;
  purchControl = new FormControl();
  invoiceControl = new FormControl();
  constructor(
    private generalService: GeneralOptionsService,
    private journalService: JournalService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.cantRecibida = 0;
    this.cantFacturada = 0;
    this.cantDiferencia = 0;

    // this.filteredOptionsObs = this.purchControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(4000),
    //   distinctUntilChanged(),
    //   map(value => this._filter(value))
    // );

    // this.filteredOptionsObs = this.invoiceControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(4000),
    //   distinctUntilChanged(),
    //   map(value => this._filter(value))
    // );

    // this.getLocationAvailable();
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.filterListString.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // tslint:disable-next-line: typedef
  getItemInformation() {
    debugger;
    let itemInfo = new ItemQuarantine();
    itemInfo.PedidoCompra = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    itemInfo.NumLinea = (document.getElementById('numLinea') as HTMLInputElement).valueAsNumber;

    debugger;

    if (itemInfo.PedidoCompra !== '' && itemInfo.NumLinea > 0) {
      this.generalService.itemQuarantine(itemInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
          responseItem => {
            if (responseItem) {
              this.itemInformation = responseItem;

              if (this.itemInformation.ItemName === "Error") {
                this.itemInformation.ItemName = "";
                const data = {
                  // tslint:disable-next-line: object-literal-shorthand
                  status: 'success',
                  labelTitile: 'Información',
                  textDescription: 'Error al tratar de cargar información de la línea. Validar que sea un número de línea válido'
                };
                const dialogRef = this.dialog.open(ModalInformationComponent, {
                  // tslint:disable-next-line: object-literal-shorthand
                  data: data,
                  minWidth: '70vw', maxWidth: '70vw', minHeight: '40vh', maxHeight: '40vh'
                });
              } else {
              this.getQtyInformation();
              }
            }
          }
        );
    }
  }

  // tslint:disable-next-line: typedef
  getSelectedLocationOrigen(event: any) {
    this.bodegaOrigen = event.target.value;
  }

  // tslint:disable-next-line: typedef
  getQtyInformation() {
    // tslint:disable-next-line: prefer-const
    let itemInfo = new ItemQuarantine();
    itemInfo.PedidoCompra = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    itemInfo.NumLinea = (document.getElementById('numLinea') as HTMLInputElement).valueAsNumber;
    itemInfo.InvoiceId = (document.getElementById('numFactura') as HTMLInputElement).value;

    if (itemInfo.PedidoCompra !== '' && itemInfo.NumLinea > 0) {
      this.generalService.qtyQuarantine(itemInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
          responseItem => {
            if (responseItem) {
              this.qtyQuarantine = responseItem;
              this.cantRecibida = this.qtyQuarantine.QtyRecibida;
              (document.getElementById('unidadMedida') as HTMLInputElement).value = this.qtyQuarantine.UnidadMedida

              if (this.line.CantidadRecibir !== 0) {
                this.cantFacturada = this.line.CantidadRecibir;
              } else {
                this.cantFacturada = this.qtyQuarantine.QtyFacturada;
              }
            }

            this.cantDiferencia = 0;
          }
        );
    }
  }

  // tslint:disable-next-line: typedef
  quarantineProcess() {
    let locationOrigen = new LocationModel();
    let isCorrect = true;
    let login = new LoginModel();
    // tslint:disable-next-line: one-variable-per-declaration
    let qty, numLinea, pedidoCompra, ubicacionDestino, numFactura, cantFacturado;

    qty = (document.getElementById('cantRecibir') as HTMLInputElement).valueAsNumber;
    numLinea = (document.getElementById('numLinea') as HTMLInputElement).valueAsNumber;
    pedidoCompra = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    ubicacionDestino = (document.getElementById('ubicacionDestino') as HTMLInputElement).value;
    numFactura = (document.getElementById('numFactura') as HTMLInputElement).value;
    cantFacturado = (document.getElementById('cantFacturada') as HTMLInputElement).valueAsNumber;

    if (isCorrect) {
      if (this.cantDiferencia < 0) {
        this.modelInformation('Error', 'La cantidad a recibir no puede ser mayor a la facturada');
        isCorrect = false;
      }
    }

    if(isCorrect) {
      if (this.itemInformation.ItemName === '') {
        this.modelInformation('Error', 'No hay información del artículo o de la línea del pedido de compra');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (pedidoCompra === '') {
        this.modelInformation('Error', 'Se debe ingresar un pedido de compra');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (isNaN(numLinea)) {
        this.modelInformation('Error', 'Se debe ingresar un número de línea');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (ubicacionDestino === '') {
        this.modelInformation('Error', 'Se debe ingresar la ubicación destino');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (isNaN(qty)) {
        this.modelInformation('Error', 'Se debe escribir una cantidad a ingresar');
        isCorrect = false;
      }
    }
    if (isCorrect) {
      if (cantFacturado === 0) {
        this.modelInformation('Error', 'No hay cantidades disponibles para recibir');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (qty <= 0) {
        this.modelInformation('Error', 'La cantidad NO puede ser menor o igual a cero');
        isCorrect = false;
      }
    }

    if (isCorrect) {

      login = utiles.getCacheLogin();
      // tslint:disable-next-line: prefer-const
      let quarantine = new Quarantine();

      quarantine.CantidadTrasladar = qty;
      quarantine.FacturaProveedor = (document.getElementById('numFactura') as HTMLInputElement).value;
      quarantine.NumLinea = numLinea;
      quarantine.PedidoCompra = pedidoCompra;
      quarantine.UbicacionDestino = ubicacionDestino;
      quarantine.Bodega = '';
      quarantine.UserId = login.UserId;
      quarantine.RefRecIdWMS = this.line.RefRecIdWMS;

      this.loading = true;
      this.journalService.QuarantineProcess(quarantine)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        responseQuarantine => {
            if (responseQuarantine) {
              this.loading = false;
              this.quarantineResponse = responseQuarantine;
              this.modelInformation(this.quarantineResponse.ResponseType, this.quarantineResponse.ResponseMessage);
              (document.getElementById('cantRecibir') as HTMLInputElement).valueAsNumber = 0;
              (document.getElementById('ubicacionDestino') as HTMLInputElement).value = '';
              this.getQtyInformation();
            }
          }
        );
      this.loading = false;
    }
  }

  // tslint:disable-next-line: typedef
  qtyDiferencia() {
    // tslint:disable-next-line: prefer-const
    let cantidadRecibir = (document.getElementById('cantRecibir') as HTMLInputElement).valueAsNumber;
    this.cantDiferencia = (this.cantFacturada - this.cantRecibida) - cantidadRecibir;
  }

  // tslint:disable-next-line: typedef
  modelInformation(typeMessage, message) {
    let status = '';
    let title = ''

    if (typeMessage === 'Info') {
      status = 'success';
      title = 'Información';
    } else if (typeMessage === 'Error') {
      status = 'error';
      title = 'Error';
    }
    const data = {
      // tslint:disable-next-line: object-literal-shorthand
      status: status,
      labelTitile: title,
      textDescription: message
    };
    const dialogRef = this.dialog.open(ModalInformationComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      data: data,
      minWidth: '70vw', maxWidth: '70vw', minHeight: '40vh', maxHeight: '40vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.addPanelClass('ocultar-modal');
      setTimeout(() => {
        this.dialog.closeAll();
      }, 300);
    });
  }

  // tslint:disable-next-line: typedef
  QuarantineHistory() {
    let correctProcess = true;
    // tslint:disable-next-line: prefer-const
    let purchIdLocal = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    // tslint:disable-next-line: prefer-const
    let lineNumLocal = (document.getElementById('numLinea') as HTMLInputElement).valueAsNumber;

    // tslint:disable-next-line: prefer-const
    let vQuarantineParm = new QuarantineParm();
    vQuarantineParm.PurchId = purchIdLocal;
    vQuarantineParm.LineNum = lineNumLocal;

    if (purchIdLocal === '') {
      this.modelInformation('error', 'Se debe seleccionar un pedido de compra y el número de línea para mostrar el historial');
      correctProcess = false;
    }

    if (correctProcess && isNaN(lineNumLocal)) {
      this.modelInformation('error', 'Se debe seleccionar un pedido de compra y el número de línea para mostrar el historial');
      correctProcess = false;
    }
    if (correctProcess) {
      this.router.navigate(['history'], { queryParams: { QuarantineParm: JSON.stringify(vQuarantineParm) } });
    }
  }

  // tslint:disable-next-line: typedef
  OpenModalLocations() {
    // tslint:disable-next-line: one-variable-per-declaration
    const data = {
      isQuarantine: 1
    };
    const dialogRef = this.dialog.open(ModalLocationComponent, {
      disableClose: true,
      // tslint:disable-next-line: object-literal-shorthand
      data: data,
      minWidth: '90vw', maxWidth: '90vw', minHeight: '80vh', maxHeight: '80vh'
    });
  }

  OpenModalLinesToReceive() {

    let purchId = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    let invoiceId = (document.getElementById('numFactura') as HTMLInputElement).value;

    const data = {
      purchId: purchId,
      invoiceId: invoiceId
    };

    this.itemInformation.ItemId = '';
    this.itemInformation.ItemName = '';
    this.itemInformation.Color = '';
    (document.getElementById('ubicacionDestino') as HTMLInputElement).value = '';

    const dialogRef = this.dialog.open(ModalReceiveComponent, {
      disableClose: true,
      // tslint:disable-next-line: object-literal-shorthand
      data: data,
      minWidth: '90vw', maxWidth: '90vw', minHeight: '80vh', maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.line = result.data;
      dialogRef.addPanelClass('ocultar-modal');
      setTimeout(() => {
        this.dialog.closeAll();
      }, 300);

      if (this.line !== null) {
        //locationOrigen = utiles.getCacheLocationQuarantine();
        //qty = (document.getElementById('cantRecibir') as HTMLInputElement).valueAsNumber;
        (document.getElementById('numLinea') as HTMLInputElement).valueAsNumber = this.line.NumLinea;
        this.getItemInformation();
      }
    });
  }

  DocumentSuggestion() {
    let puchId, invoiceId;
    let userModel = new LoginModel();
    this.suggestion = new SuggestionModel();
    this.filterListString = [];
    this.filterListString2 = [];
    puchId = (document.getElementById('pedidoCompra') as HTMLInputElement).value;
    invoiceId = (document.getElementById('numFactura') as HTMLInputElement).value;
    userModel = utiles.getCacheLogin();

    if (puchId !== '' && invoiceId === '') {
      this.suggestion.DocumentoToCheck = puchId;
      this.suggestion.UserId = userModel.UserId;
      this.suggestion.DocumentoType = 'Compra'
    } else if (puchId === '' && invoiceId !== '') {
      this.suggestion.DocumentoToCheck = invoiceId;
      this.suggestion.UserId = userModel.UserId;
      this.suggestion.DocumentoType = 'Factura'
    }

    this.generalService.DocumentSuggestion(this.suggestion)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      responseList => {
          if (responseList) {
            this.filteredOptions = responseList;
            this.filteredOptions.forEach(element => {
              if (element.DocumentoResponse.startsWith('COM')) {
                this.filterListString.push(element.DocumentoResponse)
              } else {
                this.filterListString2.push(element.DocumentoResponse)
              }
            });
          }
        }
      );
  }

  // tslint:disable-next-line: typedef
  goBackAction() {
    this.location.back();
  }
}
