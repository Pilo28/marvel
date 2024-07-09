import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarvelService } from './../../../core/services/marvel.service';
import { Comic } from '../../../core/models/interfaces/comic.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss'
})

export class ComicDetailComponent implements OnInit {
  comicForm: FormGroup;
  comic: Comic | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private marvelService: MarvelService) {
    this.comicForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit() {
    const comicId = this.route.snapshot.paramMap.get('id') ?? ''; 
    this.loadComic(comicId);
  }
  loadComic(comicId: string): void {
    this.marvelService.getComic(comicId).subscribe({
      next: (data) => {
        this.comic = data.data.results[0];
        this.comicForm.patchValue({
          title: this.comic.title,
          description: this.comic.description
        });
        this.errorMessage = ''; 
      },
      error: (err) => this.errorMessage = err.message
    });
  }
}
