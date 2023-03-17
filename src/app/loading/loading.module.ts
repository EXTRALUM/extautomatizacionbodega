import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading.component';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [LoadingComponent],
  entryComponents: [
    LoadingComponent
  ],
  exports: [
    RouterModule,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
  ]
})
export class LoadingModule { }
