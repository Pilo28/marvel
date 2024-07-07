import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../core/services/marvel.service';
import { Comic } from '../../../core/models/interfaces/comic.model';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html'
})
export class ComicsListComponent implements OnInit {
  comics: Comic[] = [];
  seriesId: string = '';

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) { }

  ngOnInit() {
    this.seriesId = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getComics(this.seriesId).subscribe(data => {
      this.comics = data.data.results;
    });
  }
}
