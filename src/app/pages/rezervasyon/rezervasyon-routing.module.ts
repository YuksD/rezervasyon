import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RezervasyonPage } from './rezervasyon.page';

const routes: Routes = [
  {
    path: '',
    component: RezervasyonPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'genel',
      },
      {
        path: 'genel',
        loadChildren: () => import('../rezervasyon/rezervasyon-tabs/genel/genel.module').then((m) => m.GenelPageModule),
      },
      {
        path: 'kort1',
        loadChildren: () => import('../rezervasyon/rezervasyon-tabs/kort1/kort1.module').then((m) => m.Kort1PageModule),
      },
      {
        path: 'kort2',
        loadChildren: () => import('../rezervasyon/rezervasyon-tabs/kort2/kort2.module').then((m) => m.Kort2PageModule),
      },
      {
        path: 'kort3',
        loadChildren: () => import('../rezervasyon/rezervasyon-tabs/kort3/kort3.module').then((m) => m.Kort3PageModule),
      },
      {
        path: 'kort4',
        loadChildren: () => import('../rezervasyon/rezervasyon-tabs/kort4/kort4.module').then((m) => m.Kort4PageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RezervasyonPageRoutingModule {}
