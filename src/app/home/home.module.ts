import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ]
})
export class HomeModule {

}
