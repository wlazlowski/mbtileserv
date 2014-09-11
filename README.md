mbtileserv
==========

Google and TMS enabled [mbtiles](https://www.mapbox.com/foundations/an-open-platform/#mbtiles) server.

Uses [tilelive.js](https://github.com/mapbox/tilelive.js/) and [node-mbtiles](https://github.com/mapbox/node-mbtiles).

Read more tile schemes at [Tiles à la Google Maps](http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/).

# Install

From [npm](https://www.npmjs.org/)

    $ npm install -g mbtileserv

Or from source

    $ git clone https://github.com/Eniro/mbtileserv.git
    $ cd mbtileserv
    $ npm install -g

# Run

Start server on port 5000 and load all .mbtiles in the current directory

    $ mbtileserv

Start server on port 8080 and load all .mbtiles in the /data directory

    $ mbtileserv /data 8080

# Use

Run example page (shows all loaded layers)

[http://localhost:5000/](http://localhost:5000/)

Fetch a Google/XYZ tile

[http://localhost:5000/xyz/plain_1/3/2/2.png](http://localhost:5000/xyz/plain_1/3/2/2.png)

Fetch a TMS tile

[http://localhost:5000/tms/plain_1/3/2/5.png](http://localhost:5000/tms/plain_1/3/2/5.png)
