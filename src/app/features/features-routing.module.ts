import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'home/series', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule) },
  { path: 'comics/:id', loadChildren: () => import('./comics/comics.module').then(m => m.ComicsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
