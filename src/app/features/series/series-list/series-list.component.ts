import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../../core/services/marvel.service';
import { Series } from '../../../core/models/interfaces/series.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html'
})
export class SeriesListComponent implements OnInit {
  series: Series[] = [];

  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.marvelService.getSeries().subscribe(data => {
      this.series = data.data.results;
    });
  }
}
