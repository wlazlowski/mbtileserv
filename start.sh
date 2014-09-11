#!/bin/sh
./node_modules/forever/bin/forever --minUptime 1000 --spinSleepTime 1000 index.js $1 $2