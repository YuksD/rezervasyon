import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirPageRoutingModule } from './bir-routing.module';

import { BirPage } from './bir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirPageRoutingModule
  ],
  declarations: [BirPage]
})
export class BirPageModule {}
