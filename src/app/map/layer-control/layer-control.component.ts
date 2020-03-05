import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

import { Layer } from '../layer';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {
  layers: Layer[];

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.layers = this.mapService.layers;
  }

  toggleLayerVisibility(event, layerId: string) {
    const idx = this.layers.findIndex(i => i.id === layerId);
    this.layers[idx].visible = !this.layers[idx].visible;
    this.mapService.layersUpdated.next();
    // prevent menu from closing
    event.stopPropagation();
  }

  changeStyle(layerId, style) {
    for (const layer of this.mapService.layers) {
      if (layer.id === layerId) {
        layer.currentStyle = style;
      }
    }

    this.mapService.layersUpdated.next();

    console.log('hello', layerId, style)
  }
}
