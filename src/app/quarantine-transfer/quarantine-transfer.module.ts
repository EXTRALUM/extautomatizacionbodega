import { NgModule } from '@angular/core';

import { QuarantineTransferComponent } from './components/quarantine-transfer/quarantine-transfer.component';

import { QuarantineTransferRoutingModule } from './quarantine-transfer-routing.module';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    QuarantineTransferComponent
  ],
  imports: [
    QuarantineTransferRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class QuarantineTransferModule {

}
