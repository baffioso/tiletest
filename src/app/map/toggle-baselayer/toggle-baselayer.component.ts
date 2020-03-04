import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-baselayer',
  templateUrl: './toggle-baselayer.component.html',
  styleUrls: ['./toggle-baselayer.component.css']
})
export class ToggleBaselayerComponent implements OnInit {
  isAerial = true

  constructor() { }

  ngOnInit(): void {
  }

  toggleBaselayer() {
    this.isAerial = !this.isAerial;
    console.log('toggle', this.isAerial);
  }
}
