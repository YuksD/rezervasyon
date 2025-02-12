import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kort3Page } from './kort3.page';

const routes: Routes = [
  {
    path: '',
    component: Kort3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kort3PageRoutingModule {}
