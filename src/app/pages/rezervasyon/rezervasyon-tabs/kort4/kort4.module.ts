import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kort4PageRoutingModule } from './kort4-routing.module';

import { Kort4Page } from './kort4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kort4PageRoutingModule
  ],
  declarations: [Kort4Page]
})
export class Kort4PageModule {}
