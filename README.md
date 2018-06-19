# rmp-connection

JavaScript to detect effective available bandwidth in a web envrionment WITHOUT using AJAX or Fetch. This is based on the [W3C Network Information API](http://wicg.github.io/netinfo/).

[Network Information API support is not 100% yet](https://caniuse.com/#feat=netinfo) but since it is supported in Chrome 61+, we feel it can already be used as a valid indicator.

We use it as a best-guess for first estimated available bandwidth to fast-start ABR streaming (with hls.js or Shaka player for example) in [Radiant Media Player](https://www.radiantmediaplayer.com).

## Usage as ES2015 module
```
import { RmpConnection } from '../../js/rmp-connection';
var estimate = RmpConnection.getBandwidthEstimate();
console.log(estimate)
```

The `getBandwidthEstimate` method will return (number|null) representing the estimated bandwidth in Mbps.

## Build the demo app (ES2015 > ES5)
```
git clone https://github.com/radiantmediaplayer/rmp-connection.git
cd rmp-connection
npm install -g browserify
npm install
browserify app/js/app-es2015.js -o app/js/app.js -t [ babelify ] -v
```

## Example
The index.html demo can be found live at [https://www.radiantmediaplayer.com/docs/latest/gist/rmp-connection/app/](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-connection/app/)

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License
rmp-connection is released under MIT

Radiant Media Player has its own license which can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html)
