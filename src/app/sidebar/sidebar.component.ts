import { Component, OnInit } from '@angular/core';

import { MapService } from '../map/map.service';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidenavComponent implements OnInit {
  showSidebar = false;
  signList: {
    sign: string,
    coordinates: [number, number]
  };

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getMapFeatures();
  }

  toggle() {
    this.showSidebar = !this.showSidebar;
  }

  clicked(coordinates: [number, number]) {
    this.mapService.zoomToCoordinate.emit(coordinates);
  }

  getMapFeatures() {
    this.mapService.currentMapFeatures
      .subscribe(features => {
        this.signList = features.map(i => {
          return {sign: i.properties.hovedtavle_1 , coordinates: i.geometry.coordinates};
        });
      });
  }
}
