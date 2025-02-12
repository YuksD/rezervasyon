import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirPage } from './bir.page';

const routes: Routes = [
  {
    path: '',
    component: BirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirPageRoutingModule {}
