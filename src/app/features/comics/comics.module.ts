import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComicsListComponent, ComicDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ComicsListComponent },
      { path: 'detail/:id', component: ComicDetailComponent }
    ])
  ]
})
export class ComicsModule { }
