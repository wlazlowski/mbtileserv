#!/usr/bin/env node

var fs = require('fs'),
    async = require('async'),
    express = require('express'),
    tilelive = require('tilelive'),
    mustache = require('mustache');

var dir = process.argv[2] || '.',
    port = process.argv[3] || 5000;

var tpl = fs.readFileSync('index.tpl').toString();

require('mbtiles').registerProtocols(tilelive);

function loadSources(dir, callback) {
    var sources = {};
    tilelive.list(dir, function (err, res) {
        async.each(Object.keys(res), function (name, done) {
            tilelive.load(res[name], function (err, source) {
                if (err) {
                    return done(err);
                }
                console.log("Loaded source ", name);
                sources[name] = source;
                done();
            });
        }, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, sources);
        });
    });
}

loadSources(dir, function (err, sources) {
    if (err) throw err;

    var app = express();

    app.get('/', function (req, res) {
        var html = mustache.render(tpl, {
            layers: Object.keys(sources)
        });
        res.set({
            'Content-Type': 'text/html',
            'Content-Length': html.length
        });
        res.send(html);
    });

    app.get('/:layer/:z/:x/:y.:ext', function (req, res) {
        var layer = req.params.layer,
            z = req.params.z,
            x = req.params.x,
            y = req.params.y;

        // Flip TMS y axis
        y = Math.pow(2, z) - 1 - y;

        if (!sources[layer]) {
            return res.status(404).send('Unknown layer ' + layer);
        }

        sources[layer].getTile(z, x, y, function (err, tile, headers) {
            if (err) {
                console.warn("Error getting tile ", req.path);
                return res.status(500).send(err);
            }
            res.set({
                'Content-Type': headers['Content-Type'],
                'Content-Length': tile.length
            });
            res.send(tile);
        });

    });

    console.log('Listening on port: ' + port);
    app.listen(port);

});

