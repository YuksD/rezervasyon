import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RezervasyonPageRoutingModule } from './rezervasyon-routing.module';

import { RezervasyonPage } from './rezervasyon.page';
import { RezervasyonModalComponent } from './rezervasyon-modal/rezervasyon-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RezervasyonPageRoutingModule,
    
  ],
  declarations: [RezervasyonPage, RezervasyonModalComponent]
})
export class RezervasyonPageModule {}
