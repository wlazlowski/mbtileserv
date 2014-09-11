<!DOCTYPE html>
<html lang="sv">
    <head>
        <title>eniro-leaflet</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }
            #map {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        </style>
        <script>

            var map,
                layers = {};

            window.onload = function () {
                map = L.map('map').setView([59.31566, 18.05955], 0);

                {{#layers}}
                    layers['{{.}}'] = L.tileLayer('{{.}}/{z}/{x}/{y}.png', {
                        tms: true
                    });
                {{/layers}}

                layers['{{layers.0}}'].addTo(map);

                L.control.layers(layers, null, {
                    collapsed: false
                }).addTo(map);
            }

        </script>
    </head>
    <body>
        <div id="map"/>
    </body>
</html>
