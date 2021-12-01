import RmpConnection from '../../js/rmp-connection.js';

const bwElement = document.getElementById('bw');
const time = window.performance.now();

const _appendBWData = function (inputEstimate) {
  let newTime = Math.round((window.performance.now() - time) / 1000);
  if (newTime === 0) {
    newTime = 1;
  }
  let text = '';
  if (inputEstimate < 0) {
    text = '<strong>unknown</strong>';
  } else {
    text = '<strong>' + inputEstimate + ' Mbps</strong>';
  }
  text += ' - ' + newTime + ' seconds after first test';
  const htmlText = '<p class="card-text">' + text + '</p>';
  bwElement.insertAdjacentHTML('afterbegin', htmlText);
};

const rmpConnection = new RmpConnection();
let estimate = rmpConnection.getBandwidthEstimate();
_appendBWData(estimate);

// every 5 sec we update demo
setInterval(() => {
  estimate = rmpConnection.getBandwidthEstimate();
  _appendBWData(estimate);
}, 5000);
