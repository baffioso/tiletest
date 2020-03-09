export interface Layer {
    sourceId: string;
    source: mapboxgl.VectorSource;
    layers: LayerItem[];
}

export interface LayerItem {
    layer: LayerStatic;
    styles: StyleCombine[];
}

export interface LayerStatic {
    name: string;
    id: string;
    source: string;
    'source-layer': string;
    minzoom?: number;
    maxzoom?: number;
}

export interface StyleCombine {
    meta: StyleMeta;
    style: Style;
}

export interface StyleMeta {
    id: string;
    name: string;
    description?: string;
}

export interface Style {
    type: mapboxgl.Layer['type'];
    paint?: mapboxgl.Layer['paint'];
    layout?: mapboxgl.AnyLayout;
}

export interface LayerControlItem {
    id: string;
    name: string;
    visible: boolean;
    currentStyle: string;
    styles: any;
}
