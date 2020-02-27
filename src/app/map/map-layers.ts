export const LAYERS = {
    signs: {
        source: {
            type: 'vector',
            tiles: [
                'https://tegola.baffioso.dk/maps/puma/{z}/{x}/{y}.pbf'
            ],
            minzoom: 7,
            maxzoom: 22
        },
        layer: {
            id: 'signs',
            type: 'circle',
            source: 'signs',
            'source-layer': 'skilte',
            paint: {
                'circle-color': 'rgb(53, 175, 109)',
                'circle-radius': 4
            }
        }
    },
    matrikel: {
        source: {
            type: 'vector',
            tiles: [
                'https://tegola.baffioso.dk/maps/puma/{z}/{x}/{y}.pbf'
            ],
            minzoom: 7,
            maxzoom: 22
        },
        layer: {
            id: 'matrikel',
            type: 'line',
            source: 'signs',
            'source-layer': 'matrikel',
            paint: {
                'line-width': 1.5,
                'line-color': 'rgba(230, 0, 0, 1)'
            }
        }
    },
    many_points: {
        source: {
            type: 'vector',
            tiles: [
                'https://tegola.baffioso.dk/maps/test/{z}/{x}/{y}.pbf'
            ],
            minzoom: 7,
            maxzoom: 22
        },
        layer: {
            id: 'many_points',
            type: 'circle',
            source: 'tiletest',
            'source-layer': 'many_points',
            paint: {
                'circle-color': 'rgb(53, 175, 255)',
                'circle-radius': 2
            }
        }
    }
};
