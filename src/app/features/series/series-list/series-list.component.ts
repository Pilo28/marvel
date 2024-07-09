import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../../core/services/marvel.service';
import { Series } from '../../../core/models/interfaces/series.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html'
})
export class SeriesListComponent implements OnInit {
  series: Series[] = [];
  errorMessage: string = '';

  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries(): void {
    this.marvelService.getSeries().subscribe({
      next: (response) => this.series = response.data.results,
      error: (err) => this.errorMessage = err.message
    });
  }
}
