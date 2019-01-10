import RMPCONNECTION from '../../js/rmp-connection';

(() => {

  'use strict';

  const bwElement = document.getElementById('bw');
  const time = window.performance.now();

  const _appendBWData = function (inputEstimate) {
    const newTime = Math.round((window.performance.now() - time) / 1000);
    let text = '';
    if (inputEstimate < 0) {
      text = '<strong>unknown</strong>';
    } else {
      text = '<strong>' + inputEstimate + ' Mbps</strong>';
    }
    text += ' - ' + newTime + ' seconds after first test';
    const htmlText = '<p>' + text + '</p>';
    bwElement.insertAdjacentHTML('afterbegin', htmlText);
  };

  let estimate = RMPCONNECTION.getBandwidthEstimate();
  _appendBWData(estimate);

  // every 5 sec we update demo
  setInterval(function () {
    estimate = RMPCONNECTION.getBandwidthEstimate();
    _appendBWData(estimate);
  }, 5000);

})();
