import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kort4Page } from './kort4.page';

const routes: Routes = [
  {
    path: '',
    component: Kort4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kort4PageRoutingModule {}
