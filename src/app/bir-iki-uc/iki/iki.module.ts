import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IkiPageRoutingModule } from './iki-routing.module';

import { IkiPage } from './iki.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IkiPageRoutingModule
  ],
  declarations: [IkiPage]
})
export class IkiPageModule {}
