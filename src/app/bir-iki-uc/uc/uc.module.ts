import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UcPageRoutingModule } from './uc-routing.module';

import { UcPage } from './uc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UcPageRoutingModule
  ],
  declarations: [UcPage]
})
export class UcPageModule {}
