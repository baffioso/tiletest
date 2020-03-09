import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

import { LayerControlItem } from '../interfaces/layer-control-item';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {
  layers: LayerControlItem[];
  // layers;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    // this.mapService.getLayers().subscribe(layers => {
    //   this.layers = this.mapService.layerList(layers);
    // });

    this.layers = this.mapService.layerControl;
  }

  toggleLayerVisibility(event, layerId: string) {
    const idx = this.layers.findIndex(i => i.id === layerId);
    this.layers[idx].visible = !this.layers[idx].visible;
    this.mapService.updateLayerVisible.next();
    // prevent menu from closing
    event.stopPropagation();
  }

  changeStyle(layerId, styleId) {
    for (const layer of this.mapService.layerControl) {
      if (layer.id === layerId) {
        layer.currentStyle = styleId;
      }
    }

    this.mapService.updateLayerStyle.next({layer: layerId, style: styleId});
    event.stopPropagation();
  }
}
