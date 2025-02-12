import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { AchievementsComponent } from './components/achievements/achievements.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule
  ],
  declarations: [
    ProfilPage, 
    ProfileInfoComponent, 
    CustomButtonComponent, 
    AchievementsComponent, 
    AvatarComponent
  ]
})
export class ProfilPageModule {}
