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
                layer: {
                    name: 'Skilte',
                    id: 'signs',
                    source: 'puma',
                    'source-layer': 'skilte',
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Normal',
                            description: 'Dette er min default style',
                        },
                        style: {
                            type: 'circle',
                            paint: {
                                'circle-color': 'rgb(53, 175, 109)',
                                'circle-radius': 4
                            }
                        }
                    }, {
                        meta: {
                            id: 'ugly',
                            name: 'Grim',
                            description: 'Dette er en grimme punkter',
                        },
                        style: {
                            type: 'circle',
                            paint: {
                                'circle-color': 'rgb(255, 0, 109)',
                                'circle-radius': 8
                            }
                        }
                    }, {
                        meta: {
                            id: 'icon',
                            name: 'Ikon',
                            description: 'Sprite ikoner på kortet',
                        },
                        style: {
                            type: 'symbol',
                            layout: {
                                'icon-image': 'grave',
                                'icon-size': 0.1
                            }
                        }
                    },
                ]

            },
            {
                layer: {
                    name: 'Matrikel (tegola)',
                    id: 'matrikel',
                    source: 'puma',
                    'source-layer': 'matrikel',
                    minzoom: 0,
                    maxzoom: 22,
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Rød',
                            description: 'Rød'
                        },
                        style: {
                            type: 'line',
                            paint: {
                                'line-width': 1.5,
                                'line-color': 'rgba(230, 0, 0, 1)'
                            }
                        }

                    }, {
                        meta: {
                            id: 'another',
                            name: 'Lilla',
                            description: 'Lilla matrikler'
                        },
                        style: {
                            type: 'line',
                            paint: {
                                'line-width': 4,
                                'line-color': 'rgba(230, 0, 255, 1)'
                            }
                        }

                    }, {
                        meta: {
                            id: 'extruded',
                            name: 'Extrusion',
                            description: 'Bla bla bla'
                        },
                        style: {
                            minzoom: 0,
                            maxzoom: 22,
                            type: 'fill-extrusion',
                            paint: {
                                'fill-extrusion-height': ['/', ['get', 'regareal'], 1000],
                                'fill-extrusion-color': [
                                    'case',
                                    ['match', ['get', 'arealtype'], ['Jernbane'], true, false],
                                    'hsl(238, 78%, 53%)',
                                    [
                                        'match',
                                        ['get', 'arealtype'],
                                        ['Brugsretsareal'],
                                        true,
                                        false
                                    ],
                                    'hsl(144, 97%, 49%)',
                                    [
                                        'match',
                                        ['get', 'arealtype'],
                                        ['Privat vej'],
                                        true,
                                        false
                                    ],
                                    'hsl(272, 92%, 68%)',
                                    ['match', ['get', 'arealtype'], ['Kanal'], true, false],
                                    'hsl(36, 100%, 55%)',
                                    'hsl(56, 68%, 57%)'
                                ],
                                'fill-extrusion-opacity': 0.76
                            }
                        }
                    }
                ]
            }
        ]
    }, {
        sourceId: 'mapbox',
        source: {
            type: 'vector',
            url: 'mapbox://baffioso.62gd8740',
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layer: {
                    name: 'Matrikel (mapbox)',
                    id: 'matrikel2',
                    source: 'mapbox',
                    'source-layer': 'mat-4cnjq9',
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Normal',
                            description: 'Blå matrikler'
                        },
                        style: {
                            type: 'line',
                            paint: {
                                'line-width': 1.5,
                                'line-color': 'rgba(0, 120, 233, 1)'
                            }
                        }
                    }
                ]

            }
        ]
    },
    {
        sourceId: 'mat_ts',
        source: {
            type: 'vector',
            tiles: ['https://tileserv.baffioso.dk/public.matrikel/{z}/{x}/{y}.pbf'],
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layer: {
                    name: 'Matrikel (tileserv)',
                    id: 'matrikel3',
                    source: 'mat_ts',
                    'source-layer': 'public.matrikel',
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Standard',
                            description: 'Bla bla bla'
                        },
                        style: {
                            minzoom: 0,
                            maxzoom: 22,
                            type: 'fill-extrusion',
                            paint: {
                                'fill-extrusion-height': ['/', ['get', 'regareal'], 1000],
                                'fill-extrusion-color': 'hsla(0, 78%, 48%, 0.7)'
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        sourceId: 'p_pladser',
        source: {
            type: 'vector',
            tiles: ['https://tileserv.baffioso.dk/public.p_pladser/{z}/{x}/{y}.pbf'],
            minzoom: 0,
            maxzoom: 22
        },
        layers: [
            {
                layer: {
                    name: 'P-pladser (tileserv)',
                    id: 'p_pladser',
                    source: 'p_pladser',
                    'source-layer': 'public.p_pladser',
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Farveskift',
                            description: 'Skifter farve mellem zoom 15-16'
                        },
                        style: {
                            minzoom: 0,
                            maxzoom: 22,
                            type: 'line',
                            "layout": {
                                "line-miter-limit": {
                                  "stops": [[6, 2], [10, 2]]
                                },
                                "line-join": {
                                  "stops": [
                                    [6, "miter"],
                                    [10, "miter"]
                                  ]
                                },
                                "visibility": "visible"
                              },
                              "paint": {
                                "line-color": {
                                  "stops": [
                                    [15, "rgba(220, 33, 33, 1)"],
                                    [16, "rgba(0, 255, 29, 1)"]
                                  ]
                                },
                                "line-translate-anchor": "map",
                                "line-width": {
                                  "stops": [[12, 1], [20, 5]]
                                },
                                "line-opacity": 1
                              },
                        }
                    }
                ]
            }
        ]
    },
    {
        sourceId: 'test',
        source: {
            type: 'vector',
            tiles: ['https://tegola.baffioso.dk/maps/test/{z}/{x}/{y}.pbf'],
            minzoom: 7,
            maxzoom: 22
        },
        layers: [
            {
                layer: {
                    name: '500k punkter',
                    id: 'many_points',
                    source: 'test',
                    'source-layer': 'many_points',
                },
                styles: [
                    {
                        meta: {
                            id: 'default',
                            name: 'Standard',
                            description: 'bla bla'
                        },
                        style: {
                            type: 'circle',
                            minzoom: 0,
                            maxzoom: 22,
                            paint: {
                                'circle-color': 'rgb(53, 175, 255)',
                                'circle-radius': 2
                            }
                        }
                    }
                ]
            }
        ]
    }
];
