import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferJournalsComponent } from './components/transfer-journals/transfer-journals.component';

const routes: Routes = [
  {
    path: '',
    component: TransferJournalsComponent
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
export class TransferJournalsRoutingModule {

}
