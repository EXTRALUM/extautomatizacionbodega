import { NgModule } from '@angular/core';

import { TransferJournalsComponent } from './components/transfer-journals/transfer-journals.component';

import { TransferJournalsRoutingModule } from './transfer-journals-routing.module';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TransferJournalsComponent
  ],
  imports: [
    TransferJournalsRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class TransferJournalsModule {

}
