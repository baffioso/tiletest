export const LAYERS = [
    {
        sourceId: 'puma',
        source: {
            type: 'vector',
            tiles: [
                'https://tegola.baffioso.dk/maps/puma/{z}/{x}/{y}.pbf'
            ],
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layerName: 'Skilte',
                id: 'signs',
                type: 'circle',
                source: 'puma',
                'source-layer': 'skilte',
                paint: {
                    'circle-color': 'rgb(53, 175, 109)',
                    'circle-radius': 4
                }
            }, {
                layerName: 'Matrikel (tegola)',
                id: 'matrikel',
                type: 'line',
                source: 'puma',
                'source-layer': 'matrikel',
                paint: {
                    'line-width': 1.5,
                    'line-color': 'rgba(230, 0, 0, 1)'
                }
            }
        ]
    },
    {
        sourceId: 'mapbox',
        source: {
            type: 'vector',
            url: 'mapbox://baffioso.62gd8740',
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layerName: 'Matrikel (mapbox)',
                id: 'matrikel2',
                type: 'line',
                source: 'mapbox',
                'source-layer': 'mat-4cnjq9',
                paint: {
                    'line-width': 1.5,
                    'line-color': 'rgba(0, 120, 233, 1)'
                }
            }
        ]
    }, {
        sourceId: 'postgis',
        source: {
            type: 'vector',
            tiles: ['http://localhost:8080/{z}/{x}/{y}.mvt'],
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layerName: 'Matrikel (postgis)',
                id: 'matrikel3',
                type: 'fill-extrusion',
                source: 'postgis',
                // ST_AsMVT() uses 'default' as layer name
                'source-layer': 'default',
                minzoom: 0,
                maxzoom: 22,
                paint: {
                    "fill-extrusion-height": ["/", ["get", "regareal"], 1000],
                    "fill-extrusion-color": "hsla(0, 78%, 48%, 0.7)"
                }
            }
        ]
    }, {
        sourceId: 'test',
        source: {
            type: 'vector',
            tiles: ['https://tegola.baffioso.dk/maps/test/{z}/{x}/{y}.pbf'],
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layerName: '500k punkter',
                id: 'many_points',
                type: 'circle',
                source: 'test',
                'source-layer': 'many_points',
                minzoom: 0,
                maxzoom: 22,
                paint: {
                    'circle-color': 'rgb(53, 175, 255)',
                    'circle-radius': 2
                }
            }
        ]
    }
]
