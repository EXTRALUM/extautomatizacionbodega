import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './components/history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent
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
export class HistoryRoutingModule {

}
