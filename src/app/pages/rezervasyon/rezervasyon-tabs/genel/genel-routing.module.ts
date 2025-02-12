import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenelPage } from './genel.page';

const routes: Routes = [
  {
    path: '',
    component: GenelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenelPageRoutingModule {}
