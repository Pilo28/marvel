import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarvelService } from './../../../core/services/marvel.service';
import { Comic } from '../../../core/models/interfaces/comic.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html'
})
export class ComicDetailComponent implements OnInit {
  comicForm: FormGroup;
  comic: Comic | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private marvelService: MarvelService) {
    this.comicForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit() {
    const comicId = this.route.snapshot.paramMap.get('id'); 
    if (comicId) {
      this.marvelService.getComic(comicId).subscribe(data => {
        this.comic = data.data.results[0]; 
        if (this.comic) {
          this.updateForm(this.comic); 
        }
      });
    }
  }

  private updateForm(comic: Comic) {
    this.comicForm.patchValue({
      title: comic.title,
      description: comic.description
    });
  }
}
