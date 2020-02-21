import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MapService } from '../map/map.service';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  showSidebar = false;
  signList: {
    sign: string,
    coordinates: [number, number]
  }[];
  private feautesSub: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getMapFeatures();
  }

  ngOnDestroy() {
    this.feautesSub.unsubscribe();
  }

  toggle() {
    this.showSidebar = !this.showSidebar;
  }

  clicked(coordinates: [number, number]) {
    this.mapService.zoomToCoordinate.next(coordinates);
  }

  getMapFeatures() {
    this.feautesSub = this.mapService.currentMapFeatures
      .subscribe(features => {
        this.signList = features.map(i => {
          return {sign: i.properties.hovedtavle_1 , coordinates: i.geometry.coordinates};
        });
      });
  }
}
