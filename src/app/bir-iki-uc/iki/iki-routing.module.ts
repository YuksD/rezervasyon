import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IkiPage } from './iki.page';

const routes: Routes = [
  {
    path: '',
    component: IkiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IkiPageRoutingModule {}
