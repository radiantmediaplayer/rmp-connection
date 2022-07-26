import RmpConnection from '../../js/rmp-connection.js';

const bwElement = document.getElementById('bw');
const time = window.performance.now();

const _appendBWData = function (bandwidthData) {
  const newTime = Math.round((window.performance.now() - time) / 1000);
  let text = '<strong>Connection Type is ' + bandwidthData.connectionType +
    ' @ ' + bandwidthData.estimate + ' Mbps</strong>';
  text += ' - ' + newTime + ' seconds after first test';
  const htmlText = '<p class="card-text">' + text + '</p>';
  bwElement.insertAdjacentHTML('afterbegin', htmlText);
};

const rmpConnection = new RmpConnection();
let bandwidthData = rmpConnection.bandwidthData;
_appendBWData(bandwidthData);

// every 5 sec we update demo
setInterval(() => {
  bandwidthData = rmpConnection.bandwidthData;
  _appendBWData(bandwidthData);
}, 5000);
