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
  signList: {
    sign: string,
    coordinates: [number, number]
  }[];
  layers;
  private featuresSub: Subscription;
  private layersSub: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getMapFeatures();
    this.layersSub = this.mapService.layers.subscribe(layers => {
      this.layers = layers;
    });
  }

  ngOnDestroy() {
    this.featuresSub.unsubscribe();
    this.layers.unsubscribe();
  }

  clicked(coordinates: [number, number]) {
    this.mapService.zoomToCoordinate.next(coordinates);
  }

  getMapFeatures() {
    this.featuresSub = this.mapService.currentMapFeatures
      .subscribe(features => {
        this.signList = features.map(i => {
          return {sign: i.properties.hovedtavle_1 , coordinates: i.geometry.coordinates};
        });
      });
  }

  updateMapFeatures() {
    this.mapService.updateCurrentMapFeatures.next();
  }
}
