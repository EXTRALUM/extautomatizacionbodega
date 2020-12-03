import { NgModule } from '@angular/core';

import { HistoryComponent } from './components/history.component';

import { HistoryRoutingModule } from './history-routing.module';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgxLoadingModule } from 'ngx-loading';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    HistoryRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    NgxLoadingModule,
    MatIconModule
  ]
})
export class HistoryModule {

}
