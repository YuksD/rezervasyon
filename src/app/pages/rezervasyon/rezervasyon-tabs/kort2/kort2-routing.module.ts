import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kort2Page } from './kort2.page';

const routes: Routes = [
  {
    path: '',
    component: Kort2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kort2PageRoutingModule {}
