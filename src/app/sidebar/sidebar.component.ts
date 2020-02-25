import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MapService } from '../map/map.service';
import { Layer } from '../map/layer';

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
  layers: Layer[];
  showSignTools = false;
  searchString: string;
  private featuresSub: Subscription;
  private layersUpdatedSub: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.signList = [];
    this.subscribeToMapFeatures();

    this.layersUpdatedSub = this.mapService.layersUpdated.subscribe(() => {
      this.layers = this.mapService.layers;
      this.showSignTools = this.mapService.layers[0].visible;
    });
  }

  ngOnDestroy() {
    this.featuresSub.unsubscribe();
    this.layersUpdatedSub.unsubscribe();
  }

  clicked(coordinates: [number, number]) {
    this.mapService.zoomToCoordinate.next(coordinates);
  }

  subscribeToMapFeatures() {
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

  getMapFeatures() {
    this.updateMapFeatures();
  }
}
