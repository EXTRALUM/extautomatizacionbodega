import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      /*{
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },*/
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'transfer-journal',
        loadChildren: () => import('./transfer-journals/transfer-journals.module').then(m => m.TransferJournalsModule)
      },
      {
        path: 'quarantine-transfer',
        loadChildren: () => import('./quarantine-transfer/quarantine-transfer.module').then(m => m.QuarantineTransferModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'operation-report',
        loadChildren: () => import('./operation-report/operation-report.module').then(m => m.OperationReportModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  //imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
