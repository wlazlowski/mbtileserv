#!/usr/bin/env node

var async = require('async'),
    express = require('express'),
    tilelive = require('tilelive');

require('mbtiles').registerProtocols(tilelive);

var app = express();

app.use('/test.html', express.static(__dirname+'/test.html'));

var dir = process.argv[2] || '.',
    port = process.argv[3] || 5000;

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

