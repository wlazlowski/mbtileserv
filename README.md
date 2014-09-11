mbtileserv
==========

Install mbtileserv
    
    $ git clone https://github.com/Eniro/mbtileserv.git
    $ cd mbtileserv
    $ npm install -g
    
Start server on port 5000 and load all .mbtiles in the current directory

    $ mbtileserv

Start server on port 8080 and load all .mbtiles in the /data directory

    $ mbtileserv /data 8080

Fetch tiles

    http://localhost:5000/plain_1/0/0/0.png
