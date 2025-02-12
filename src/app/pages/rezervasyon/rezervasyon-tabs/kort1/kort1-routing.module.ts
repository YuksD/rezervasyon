import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kort1Page } from './kort1.page';

const routes: Routes = [
  {
    path: '',
    component: Kort1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kort1PageRoutingModule {}
