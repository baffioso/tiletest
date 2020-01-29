import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filtered = new EventEmitter<any>();
  buttons = [
    { id: 'E33', img: 'c/c4/Denmark_road_sign_E33.1.svg' },
    { id: 'C61', img: 'b/bb/Denmark_road_sign_C61.svg' },
    { id: 'E19', img: 'c/c1/Denmark_road_sign_E19-L.svg' },
    { id: 'E23', img: '5/54/Denmark_road_sign_E23.svg' },
    { id: 'C19', img: '7/75/Denmark_road_sign_C19.svg' },
    { id: 'E21,1', img: 'e/e4/Denmark_road_sign_E21.1.svg' },
    { id: 'A92', img: 'a/a7/Denmark_road_sign_A92.svg' }
  ];

  constructor() { }

  ngOnInit() {
  }

  clicked(signId) {
    this.filtered.emit(signId);
  }

}
