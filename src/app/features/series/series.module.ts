import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesListComponent } from './series-list/series-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SeriesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SeriesListComponent }
    ])
  ]
})
export class SeriesModule { }
