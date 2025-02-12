import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UcPage } from './uc.page';

const routes: Routes = [
  {
    path: '',
    component: UcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UcPageRoutingModule {}
