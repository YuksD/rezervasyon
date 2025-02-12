import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnasayfaPageRoutingModule } from './anasayfa-routing.module';

import { AnasayfaPage } from './anasayfa.page';
import { GununMaciComponent } from './gunun-maci/gunun-maci.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnasayfaPageRoutingModule
  ],
  declarations: [AnasayfaPage, GununMaciComponent]
})
export class AnasayfaPageModule {}
