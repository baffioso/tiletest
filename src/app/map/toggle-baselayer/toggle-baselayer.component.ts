import { Component, OnInit } from '@angular/core';

import { MapService } from '../map.service';

@Component({
  selector: 'app-toggle-baselayer',
  templateUrl: './toggle-baselayer.component.html',
  styleUrls: ['./toggle-baselayer.component.css']
})
export class ToggleBaselayerComponent implements OnInit {
  isAerial = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  toggleBaselayer() {
    this.isAerial = !this.isAerial;
    this.mapService.changeBaselayer.next(this.isAerial);
  }
}
