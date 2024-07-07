import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @Input() items: any[] | undefined;
  @Input() type: 'series' | 'comics' | undefined;

  constructor() { }

  ngOnInit(): void { }
}
