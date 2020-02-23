import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {
  layers: any;

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
}
