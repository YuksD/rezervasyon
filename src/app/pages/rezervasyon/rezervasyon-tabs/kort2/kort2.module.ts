import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kort2PageRoutingModule } from './kort2-routing.module';

import { Kort2Page } from './kort2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kort2PageRoutingModule
  ],
  declarations: [Kort2Page]
})
export class Kort2PageModule {}
