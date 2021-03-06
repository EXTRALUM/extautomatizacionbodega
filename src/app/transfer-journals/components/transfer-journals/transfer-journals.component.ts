import { LocationModel } from '../../../core/model/location.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JournalService } from 'src/app/core/service/journal.service';
import { GeneralOptionsService } from 'src/app/core/service/general-options.service';
import { ItemInformation } from 'src/app/core/model/itemInformation.model';
import { Journal } from 'src/app/core/model/journal.model';
import { utiles } from 'src/environments/utiles';
import { LoginModel } from 'src/app/core/model/login.model';
import { JournalResponse } from 'src/app/core/model/journalResponse.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalInformationComponent } from 'src/app/core/modal/modal-information/modal-information.component';
import { ModalLocationComponent } from 'src/app/core/modal/modal-location/modal-location.component';
import { Location } from '@angular/common';
import { ModalConfirmComponent } from 'src/app/core/modal/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-transfer-journals',
  templateUrl: './transfer-journals.component.html',
  styleUrls: ['./transfer-journals.component.scss']
})
export class TransferJournalsComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  locationList: LocationModel[];
  itemInformation: ItemInformation = new ItemInformation();
  journalResponse: JournalResponse;
  locationString: string;
  itemId: string;
  journalModel: Journal;
  journalList: Journal[];
  loading: boolean;
  processRegister: number;
  journalIdGeneral: string;

  // ======================
  bodegaOrigen: string;
  bodegaDestino: string;

  ubicacionOrigen: string;
  ubicacionDestino: string;

  loteOrigen: string;
  loteDestino: string;

  qty: number;
  // =====================
  constructor(
    private journalService: JournalService,
    private generalService: GeneralOptionsService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getLocationAvailable();

    let journalCache = utiles.getCacheJournal();

    if (journalCache) {
      journalCache.forEach(element => {
        // tslint:disable-next-line: prefer-const
        let journalLocalIM = new Journal();
        journalLocalIM.ItemId = element.ItemId;
        journalLocalIM.BodegaDestino = element.BodegaDestino;
        journalLocalIM.BodegaOrigen = element.BodegaOrigen;
        journalLocalIM.Cantidad = element.Cantidad;
        journalLocalIM.Color = element.Color;
        journalLocalIM.ItemId = element.ItemId;
        journalLocalIM.JournalId = element.JournalId;
        journalLocalIM.LoteDestino = element.LoteDestino;
        journalLocalIM.LoteOrigen = element.LoteOrigen;
        journalLocalIM.Size = element.Size;
        journalLocalIM.Style = element.Style;
        journalLocalIM.UbicacionDestino = element.UbicacionDestino;
        journalLocalIM.UbicacionOrigen = element.UbicacionOrigen;
        journalLocalIM.UserId = element.UserId;

        this.journalIdGeneral = element.JournalId;

        this.journalList.push(journalLocalIM);
      });
    }
  }

  // tslint:disable-next-line: typedef
  getLocationAvailable() {
    this.journalService.LocationAvailable()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      responseLocations => {
        if (responseLocations) {
          this.locationList = responseLocations;
          // this.locationList = responseLocations;
        }
      }
    );
  }
  // tslint:disable-next-line: typedef
  getItemInformation() {
    // tslint:disable-next-line: prefer-const
    let itemInfo = new ItemInformation();
    itemInfo.ItemId = (document.getElementById('itemId') as HTMLInputElement).value;
    this.generalService.itemInformation(itemInfo)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
        responseItem => {
          if (responseItem) {
            this.itemInformation = responseItem;
          }
        }
      );
  }

  // tslint:disable-next-line: typedef
  getSelectedLocationOrigen(event: any) {
    this.bodegaOrigen = event.target.value;
  }

  // tslint:disable-next-line: typedef
  getSelectedLocationDestino(event: any) {
    this.bodegaDestino = event.target.value;
  }
    // debugger;
    // tslint:disable-next-line: max-line-length
    // this.locationString = '[{"LocationId":"04AA00031","LocationName":"VIDRIO LAMINA MATERIA PRIMA"},{"LocationId":"04AC05001","LocationName":"REPUESTOS ESPECIFICOS"}]';
    // this.locationList = JSON.parse(this.locationString);

  // tslint:disable-next-line: typedef
  journalProcess(processType: number) {

    let locationOrigen = new LocationModel();
    let locationDestino = new LocationModel();
    let isCorrect = true;
    let journalIdCache = '';
    let loginModel = new LoginModel();

    locationOrigen = utiles.getCacheLocationOrigen();
    locationDestino = utiles.getCacheLocationDestino();
    loginModel = utiles.getCacheLogin();

    this.ubicacionOrigen = (document.getElementById('ubicacionOrigen') as HTMLInputElement).value;
    this.ubicacionDestino = (document.getElementById('ubicacionDestino') as HTMLInputElement).value;

    this.loteOrigen = (document.getElementById('loteOrigen') as HTMLInputElement).value;
    this.loteDestino = (document.getElementById('loteDestino') as HTMLInputElement).value;

    this.qty = (document.getElementById('inputCantidad') as HTMLInputElement).valueAsNumber;

    if (locationOrigen !== undefined && locationOrigen !== null) {
      this.bodegaOrigen = locationOrigen.LocationId;
    } else {
      this.modelInformation('Error', 'Se debe seleccionar la bodega origen');
      isCorrect = false;
    }

    if (this.ubicacionOrigen === this.ubicacionDestino && this.loteOrigen === this.loteDestino) {
      this.modelInformation('Error', 'Tanto las ubicaciones como los lotes deben ser distinos, por favor revisar la información');
      isCorrect = false;
    }

    if (isCorrect)
    {
      if (locationDestino !== undefined && locationDestino !== null) {
        this.bodegaDestino = locationDestino.LocationId;
      } else {
        this.modelInformation('Error', 'Se debe seleccionar la bodega destino');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      if (this.itemInformation.ItemId === '') {
        this.modelInformation('Error', 'Se debe ingresar el artículo a transferir');
        isCorrect = false;
      }
    }

    if (isCorrect) {
      // tslint:disable-next-line: use-isnan
      if (isNaN(this.qty)) {
        this.modelInformation('Error', 'Se debe escribir una cantidad');
        isCorrect = false;
      }
      if (this.qty <= 0) {
        this.modelInformation('Error', 'La cantidad no puede ser menor o igual a cero');
        isCorrect = false;
      }
    }

    this.journalList = [];

    if (isCorrect)
    {
      this.loading = true;
      // tslint:disable-next-line: prefer-const
      let journalCache = utiles.getCacheJournal();

      if (journalCache) {
        journalCache.forEach(element => {
          // tslint:disable-next-line: prefer-const
          let journalLocalIM = new Journal();
          journalLocalIM.ItemId = element.ItemId;
          journalLocalIM.BodegaDestino = element.BodegaDestino;
          journalLocalIM.BodegaOrigen = element.BodegaOrigen;
          journalLocalIM.Cantidad = element.Cantidad;
          journalLocalIM.Color = element.Color;
          journalLocalIM.ItemId = element.ItemId;
          journalLocalIM.JournalId = element.JournalId;
          journalLocalIM.LoteDestino = element.LoteDestino;
          journalLocalIM.LoteOrigen = element.LoteOrigen;
          journalLocalIM.Size = element.Size;
          journalLocalIM.Style = element.Style;
          journalLocalIM.UbicacionDestino = element.UbicacionDestino;
          journalLocalIM.UbicacionOrigen = element.UbicacionOrigen;
          journalLocalIM.UserId = element.UserId;

          journalIdCache = element.JournalId;

          this.journalList.push(journalLocalIM);
        });
      }

      // tslint:disable-next-line: prefer-const
      let journalLocal = new Journal();
      journalLocal.ItemId = this.itemInformation.ItemId;
      journalLocal.BodegaDestino = this.bodegaDestino;
      journalLocal.BodegaOrigen = this.bodegaOrigen;
      journalLocal.Cantidad = this.qty;
      journalLocal.Color = this.itemInformation.Color;
      journalLocal.Style = this.itemInformation.Style;
      journalLocal.Size = this.itemInformation.Size;
      journalLocal.JournalId = journalIdCache;
      journalLocal.LoteDestino = this.loteDestino;
      journalLocal.LoteOrigen = this.loteOrigen;
      journalLocal.UbicacionDestino = this.ubicacionDestino;
      journalLocal.UbicacionOrigen = this.ubicacionOrigen;
      journalLocal.UserId = loginModel.UserId;
      journalLocal.RegistraDiario = processType;

      this.journalService.JournalProcess(journalLocal)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
          responseJournal => {
            if (responseJournal) {
              this.journalResponse = responseJournal;
              this.loading = false;
              if (this.journalResponse.MessageType === 'Info') {
                journalLocal.JournalId = this.journalResponse.JournalId;
                this.journalList.push(journalLocal);
                utiles.createCacheJournal(this.journalList);
                this.journalIdGeneral = this.journalResponse.JournalId;

                (document.getElementById('ubicacionOrigen') as HTMLInputElement).value = '';
                (document.getElementById('ubicacionDestino') as HTMLInputElement).value = '';
                (document.getElementById('itemId') as HTMLInputElement).value = '';
                (document.getElementById('inputCantidad') as HTMLInputElement).valueAsNumber = 0;

                this.itemInformation.ItemId = '';
                this.itemInformation.ItemName = '';
                this.itemInformation.Color = '';
                this.itemInformation.Style = '';
                this.itemInformation.Size = '';
              }
              this.modelInformation(this.journalResponse.MessageType, this.journalResponse.Message);
            }
          }
        );
    }
  }

  // tslint:disable-next-line: typedef
  journalRegister() {

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      disableClose: true,
      minWidth: '55vw', maxWidth: '55vw', minHeight: '35vh', maxHeight: '35vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.processRegister = result.data;
      dialogRef.addPanelClass('ocultar-modal');
      setTimeout(() => {
        this.dialog.closeAll();
      }, 300);

      if (this.processRegister === 1) {
        this.journalProcessRegister();
      }

    });
  }

  // tslint:disable-next-line: typedef
  journalProcessRegister() {
    let journalLocalCache;
    // tslint:disable-next-line: prefer-const
    let journalIdCache = '';

    journalLocalCache = utiles.getCacheJournal();

    if (journalLocalCache !== null) {
      journalLocalCache.forEach(element => {
        journalIdCache = element.JournalId;
      });
    } else {
      journalIdCache = '';
    }

    if (journalIdCache !== '') {
      this.loading = true;
      // tslint:disable-next-line: prefer-const
      let journalLocal = new Journal();
      journalLocal.JournalId = journalIdCache;
      journalLocal.RegistraDiario = 1;

      this.journalService.JournalProcess(journalLocal)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
          responseJournal => {
            if (responseJournal) {
              this.journalResponse = responseJournal;
              this.loading = false;
              if (this.journalResponse.MessageType === 'Info') {
                utiles.clearCacheJournal();
                this.journalIdGeneral = '';

                (document.getElementById('ubicacionOrigen') as HTMLInputElement).value = '';
                (document.getElementById('ubicacionDestino') as HTMLInputElement).value = '';
                (document.getElementById('itemId') as HTMLInputElement).value = '';
                (document.getElementById('inputCantidad') as HTMLInputElement).valueAsNumber = 0;

                this.itemInformation.ItemId = '';
                this.itemInformation.ItemName = '';
                this.itemInformation.Color = '';
                this.itemInformation.Style = '';
                this.itemInformation.Size = '';

              }
              this.modelInformation(this.journalResponse.MessageType, this.journalResponse.Message);
            }
          }
        );
    } else {
      this.modelInformation('Error', 'Se debe agregar primero una línea para registrar un diario de inventario');
    }
  }

  // tslint:disable-next-line: typedef
  modelInformation(typeMessage, message) {
    let status = '';
    let title = '';
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
      minWidth: '70vw', maxWidth: '70vw', minHeight: '50vh', maxHeight: '50vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.addPanelClass('ocultar-modal');
      setTimeout(() => {
        this.dialog.closeAll();
      }, 300);
    });
  }

    // tslint:disable-next-line: typedef
  OpenModalLocations() {
    // tslint:disable-next-line: one-variable-per-declaration
    const data = {
      isQuarantine: 0
    };
    const dialogRef = this.dialog.open(ModalLocationComponent, {
      disableClose: true,
      // tslint:disable-next-line: object-literal-shorthand
      data: data,
      minWidth: '90vw', maxWidth: '90vw', minHeight: '80vh', maxHeight: '80vh'
    });
  }

  // tslint:disable-next-line: typedef
  goBackAction() {
    this.location.back();
  }
}
