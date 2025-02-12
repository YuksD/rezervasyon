import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kort3PageRoutingModule } from './kort3-routing.module';

import { Kort3Page } from './kort3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kort3PageRoutingModule
  ],
  declarations: [Kort3Page]
})
export class Kort3PageModule {}
