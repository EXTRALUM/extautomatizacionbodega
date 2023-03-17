import { LoginModel } from '../app/core/model/login.model';
import { from } from 'rxjs';
import { Journal } from 'src/app/core/model/journal.model';
import { Quarantine } from 'src/app/core/model/quarantine.model';
// import { Location } from '@angular/common';
import { LocationModel } from '../app/core/model/location.model';

// tslint:disable-next-line:class-name
export class utiles {

  constructor() { }

  // tslint:disable-next-line: typedef
  static clearAllCache() {
    this.clearCacheUser();
  }
  // tslint:disable-next-line: typedef
  static clearCacheUser() {
    localStorage.removeItem('login');
    //localStorage.removeItem('journalLine');
    localStorage.removeItem('quarantineLine');
    localStorage.removeItem('locationOrigen');
    localStorage.removeItem('locationDestino');
    localStorage.removeItem('locationQuarantine');
  }

  // tslint:disable-next-line: typedef
  static clearCacheJournal() {
    localStorage.removeItem('journalLine');
  }

  // tslint:disable-next-line: typedef
  static clearCacheLocationOrigen() {
    localStorage.removeItem('locationOrigen');
  }

  // tslint:disable-next-line: typedef
  static clearCacheLocationDestino() {
    localStorage.removeItem('locationDestino');
  }

  // tslint:disable-next-line: typedef
  static clearCacheLocationQuarantine() {
    localStorage.removeItem('locationQuarantine');
  }

  static clearCacheJournalId() {
    localStorage.removeItem('journalId');
  }
  
  static clearCacheReportMO() {
    localStorage.removeItem('ReportMOModel');
  }

  static createCacheReportMO(data) {
    localStorage.setItem('ReportMOModel', JSON.stringify(data));
  }

  // tslint:disable-next-line: typedef
  static createLocationOrigen(locationOrigen: LocationModel) {
    localStorage.setItem('locationOrigen', JSON.stringify(locationOrigen));
  }
  // tslint:disable-next-line: typedef
  static createLocationDestino(locationDestino: LocationModel) {
    localStorage.setItem('locationDestino', JSON.stringify(locationDestino));
  }

  // tslint:disable-next-line: typedef
  static createLocationQuarantine(locationQuarantine: LocationModel) {
    localStorage.setItem('locationQuarantine', JSON.stringify(locationQuarantine));
  }
  // tslint:disable-next-line: typedef
  static createCacheUser(userModel: LoginModel) {
    localStorage.setItem('login', JSON.stringify(userModel));
  }

  // tslint:disable-next-line: typedef
  static createCacheJournal(journalLine: Journal[]) {
    localStorage.setItem('journalLine', JSON.stringify(journalLine));
  }

  // tslint:disable-next-line: typedef
  static createCacheQuarantine(quarantineLine: Quarantine[]) {
    localStorage.setItem('quarantineLine', JSON.stringify(quarantineLine));
  }

  static createCacheJournalId(journalId: string) {
    localStorage.setItem('journalId', JSON.stringify(journalId));
  }

  // tslint:disable-next-line: typedef
  static getCacheLogin() {
    const info = localStorage.getItem('login');
    const data = JSON.parse(info);
    return data;
  }

  // tslint:disable-next-line: typedef
  static getCacheJournal() {
    const info = localStorage.getItem('journalLine');
    const data = JSON.parse(info);
    return data;
  }

  // tslint:disable-next-line: typedef
  static getCacheQuarantine() {
    const info = localStorage.getItem('quarantineLine');
    const data = JSON.parse(info);
    return data;
  }

  // tslint:disable-next-line: typedef
  static getCacheLocationOrigen() {
    const info = localStorage.getItem('locationOrigen');
    const data = JSON.parse(info);
    return data;
  }
  // tslint:disable-next-line: typedef
  static getCacheLocationDestino() {
    const info = localStorage.getItem('locationDestino');
    const data = JSON.parse(info);
    return data;
  }

  // tslint:disable-next-line: typedef
  static getCacheLocationQuarantine() {
    const info = localStorage.getItem('locationQuarantine');
    const data = JSON.parse(info);
    return data;
  }

  static getCacheJournalId() {
    const info = localStorage.getItem('journalId');
    const data = JSON.parse(info);
    return data;
  }
  
  static getCacheReportMO() {
    const reportMO = localStorage.getItem('ReportMOModel');
    const reportMOModel = JSON.parse(reportMO);
    return reportMOModel;
  }
}
