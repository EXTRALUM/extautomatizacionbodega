import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuarantineTransferComponent } from './components/quarantine-transfer/quarantine-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: QuarantineTransferComponent
  }
];

@NgModule ({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class QuarantineTransferRoutingModule {

}
