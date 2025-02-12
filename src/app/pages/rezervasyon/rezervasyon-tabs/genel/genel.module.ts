import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenelPageRoutingModule } from './genel-routing.module';

import { GenelPage } from './genel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenelPageRoutingModule
  ],
  declarations: [GenelPage]
})
export class GenelPageModule {}
