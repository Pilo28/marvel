import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { BackButtonDirective } from './directives/back-button.directive';


@NgModule({
  declarations: [
    CapitalizePipe,
    HighlightDirective,
    ListComponent,
    BackButtonDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CapitalizePipe,
    HighlightDirective,
    CommonModule,
    ReactiveFormsModule,
    ListComponent,
    BackButtonDirective
  ]
})
export class SharedModule { }
