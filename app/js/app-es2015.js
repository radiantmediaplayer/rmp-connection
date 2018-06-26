import { RMPCONNECTION } from '../../js/rmp-connection';

(() => {

  'use strict';

  var bwElement = document.getElementById('bw');
  var time = window.performance.now();

  var _appendBWData = function (estimate) {
    var newTime = Math.round((window.performance.now() - time) / 1000);
    var text = '';
    if (estimate < 0) {
      text = '<strong>unknown</strong>';
    } else {
      text = '<strong>' + estimate + ' Mbps</strong>';
    }
    text += ' - ' + newTime + ' seconds after first test';
    var htmlText = '<p>' + text + '</p>';
    bwElement.insertAdjacentHTML('afterbegin', htmlText);
  };

  var estimate = RMPCONNECTION.getBandwidthEstimate();
  _appendBWData(estimate);

  // every 5 sec we update demo
  setInterval(function () {
    estimate = RMPCONNECTION.getBandwidthEstimate();
    _appendBWData(estimate);
  }, 5000);

})();