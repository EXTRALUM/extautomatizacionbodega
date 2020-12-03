import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { JournalService } from '../../service/journal.service';
import { LocationModel } from '../../../core/model/location.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationParamsModal } from '../../model/locationParams.modal';
import { utiles } from 'src/environments/utiles';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  locationListOrigen: LocationModel[];
  locationListDestino: LocationModel[];
  selectedLocationOrigen: string;
  selectedLocationDestino: string;
  filteredOptionsOrigen: Observable<LocationModel[]>;
  filteredOptionsDestino: Observable<LocationModel[]>;
  myControlOrigen = new FormControl();
  myControlDestino = new FormControl();
  showLocationDestino: boolean;
  locationOrigen: string;
  locationDestino: string;

  constructor(@Inject(MAT_DIALOG_DATA)public dataMessage: LocationParamsModal, private journalService: JournalService) {
    if (this.dataMessage !== undefined) {
      if (this.dataMessage.isQuarantine === 1) {
        this.showLocationDestino = false;
      } else {
        this.showLocationDestino = true;
      }
    }
   }

  ngOnInit(): void {
    this.locationOrigen = '';
    this.locationDestino = '';
    this.getLocations();
  }

  private _filterOrigen(value: string): LocationModel[] {
    let filterValue = value;
    let locationOrig = new LocationModel();

    if (this.showLocationDestino) {
      locationOrig = utiles.getCacheLocationOrigen();
    } else {
      locationOrig = utiles.getCacheLocationQuarantine();
    }

    if (filterValue === '') {
      if (locationOrig !== null) {
        this.locationOrigen = locationOrig.LocationId;
        filterValue = locationOrig.LocationName;
      }
    }

    return this.locationListOrigen.filter(option => option.LocationName.includes(filterValue));
  }

  private _filterDestino(value: string): LocationModel[] {
    let filterValue = value;
    let locationDest = new LocationModel();

    locationDest = utiles.getCacheLocationDestino();

    if (filterValue === '') {
      if (locationDest !== null) {
        this.locationDestino = locationDest.LocationId;
        filterValue = locationDest.LocationName;
      }
    }

    return this.locationListDestino.filter(option => option.LocationName.includes(filterValue));
  }

  // tslint:disable-next-line: typedef
  getLocations() {
    this.journalService.LocationAvailable()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      responseLocations => {
        if (responseLocations) {
          this.locationListOrigen = responseLocations;
          this.locationListDestino = responseLocations;

          this.filteredOptionsOrigen = this.myControlOrigen.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterOrigen(value))
          );

          this.filteredOptionsDestino = this.myControlDestino.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterDestino(value))
          );
        }
      }
    );
  }

  // tslint:disable-next-line: typedef
  getSelectedLocationOrigen(event: any) {
    this.selectedLocationOrigen = event;
  }

  // tslint:disable-next-line: typedef
  getSelectedLocationDestino(event: any) {
    this.selectedLocationDestino = event;
  }

  // tslint:disable-next-line: typedef
  saveLocations() {
    let ubicacionOrigen;
    let ubicacionDestino;

    ubicacionOrigen = this.selectedLocationOrigen;
    ubicacionDestino = this.selectedLocationDestino;


    if (this.showLocationDestino) {
      // tslint:disable-next-line: prefer-const
      let locationOrigen = new LocationModel();
      // tslint:disable-next-line: prefer-const
      let locationDestino = new LocationModel();

      utiles.clearCacheLocationOrigen();
      utiles.clearCacheLocationDestino();

      if (ubicacionOrigen !== '') {
        locationOrigen.LocationId = ubicacionOrigen.LocationId;
        locationOrigen.LocationName = ubicacionOrigen.LocationName;
        utiles.createLocationOrigen(locationOrigen);
      }

      if (ubicacionDestino !== '') {
        locationDestino.LocationId = ubicacionDestino.LocationId;
        locationDestino.LocationName = ubicacionDestino.LocationName;
        utiles.createLocationDestino(locationDestino);
      }

    } else {
      // tslint:disable-next-line: prefer-const
      let locationOrigen = new LocationModel();
      utiles.clearCacheLocationQuarantine();

      if (ubicacionOrigen !== '') {
        locationOrigen.LocationId = ubicacionOrigen.LocationId;
        locationOrigen.LocationName = ubicacionOrigen.LocationName;
        utiles.createLocationQuarantine(locationOrigen);
      }
    }
  }
}
