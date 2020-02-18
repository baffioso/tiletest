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
  signList;

  constructor(private mapService: MapService) {
    this.getMapFeatures();
  }

  ngOnInit() {
    //this.getMapFeatures();
  }

  toggle() {
    this.showSidebar = !this.showSidebar;
  }

  clicked(coordinates) {
    this.mapService.zoomToCoordinate.emit(coordinates);
  }

  getMapFeatures() {
    this.mapService.currentMapFeatures
      .subscribe(features => {
        this.signList = features.map(feature => {
          return {sign: feature.properties.hovedtavle_1 , coordinates: feature.geometry.coordinates}
        });
      });
  }

}
