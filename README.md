# rmp-connection

Client-side JavaScript to detect effective available bandwidth and connection type in a web envrionment WITHOUT using AJAX or Fetch. This is based on the [W3C Network Information API](http://wicg.github.io/netinfo/).

[Network Information API support is not 100% yet](https://caniuse.com/#feat=netinfo) but is fairly decent (works everywhere but in Safari and Firefox)

We use it as a best-guess first estimate for available bandwidth and connection type to fast-start ABR streaming in [Radiant Media Player](https://www.radiantmediaplayer.com).

## Usage as ES2015 module
```
import RmpConnection from '../../js/rmp-connection';
const rmpConnection = new RmpConnection();
const bandwidthData = rmpConnection.bandwidthData;
console.log(bandwidthData);
```

The `bandwidthData` getter will return `Object: {estimate: Number, connectionType: String}` representing the estimated bandwidth in Mbps and the connection type (possible values are 'ethernet', 'wifi', 'cellular', 'unknown', 'none'). `{-1, 'unknown'}` is returned if no value is available.

## Example
The app/index.html demo can be found at [https://www.radiantmediaplayer.com/docs/latest/gist/rmp-connection/app/](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-connection/app/)

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License for rmp-connection
rmp-connection is released under MIT

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: https://www.radiantmediaplayer.com/free-trial.html.
