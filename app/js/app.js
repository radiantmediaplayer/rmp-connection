(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _rmpConnection = require('../../js/rmp-connection');

(function () {

  'use strict';

  var bwElement = document.getElementById('bw');
  var time = window.performance.now();

  var _appendBWData = function _appendBWData(estimate) {
    var newTime = Math.round((window.performance.now() - time) / 1000);
    var text = '';
    if (estimate === null) {
      text = '<strong>unknown</strong>';
    } else {
      text = '<strong>' + estimate + ' Mbps</strong>';
    }
    text += ' - ' + newTime + ' seconds after first test';
    var htmlText = '<p>' + text + '</p>';
    bwElement.insertAdjacentHTML('afterbegin', htmlText);
  };

  var estimate = _rmpConnection.RMPCONNECTION.getBandwidthEstimate();
  _appendBWData(estimate);

  // every 5 sec we update demo
  setInterval(function () {
    estimate = _rmpConnection.RMPCONNECTION.getBandwidthEstimate();
    _appendBWData(estimate);
  }, 5000);
})();

},{"../../js/rmp-connection":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license Copyright (c) 2015-2018 Radiant Media Player 
 * rmp-connection 0.1.1 | https://github.com/radiantmediaplayer/rmp-connection
 */

var RMPCONNECTION = {};

var _getArbitraryBitrateData = function _getArbitraryBitrateData() {
  // we actually have indication here: http://wicg.github.io/netinfo/#effective-connection-types
  var equivalentMbpsArray = [0.025, 0.035, 0.35, 1.4];
  // if we are in a bluetooth/cellular connection.type with 4g assuming 1.4 Mbps is a bit high so we settle for 0.7 Mbps
  // for ethernet/wifi/wimax where available bandwidth is likely higher we settle for 2.1 Mbps
  if (typeof navigator.connection.type === 'string' && navigator.connection.type !== '') {
    switch (navigator.connection.type) {
      case 'bluetooth':
      case 'cellular':
        equivalentMbpsArray[3] = 0.7;
        break;
      case 'ethernet':
      case 'wifi':
      case 'wimax':
        equivalentMbpsArray[3] = 2.1;
        break;
      default:
        break;
    }
  }
  return equivalentMbpsArray;
};

RMPCONNECTION.getBandwidthEstimate = function () {
  // we are not in a supported environment - exit
  if (typeof window === 'undefined') {
    return;
  }
  // we are offline - exit
  if (typeof navigator.onLine !== 'undefined' && !navigator.onLine) {
    return null;
  }
  // we do not have navigator.connection - exit
  // for support see https://caniuse.com/#feat=netinfo
  if (typeof navigator.connection === 'undefined') {
    return null;
  }
  // we do have navigator.connection.type but it reports no connection - exit
  if (typeof navigator.connection.type === 'string' && navigator.connection.type === 'none') {
    return null;
  }
  // we have navigator.connection.downlink - this is our best estimate
  // Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.
  if (typeof navigator.connection.downlink === 'number' && navigator.connection.downlink > 0) {
    return navigator.connection.downlink;
  }
  // we have navigator.connection.effectiveType - this is our second best estimate
  // Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed, round-trip time and downlink values.
  var equivalentMbpsArray = _getArbitraryBitrateData();
  if (typeof navigator.connection.effectiveType === 'string' && navigator.connection.effectiveType !== '') {
    switch (navigator.connection.effectiveType) {
      case 'slow-2g':
        return equivalentMbpsArray[0];
      case '2g':
        return equivalentMbpsArray[1];
      case '3g':
        return equivalentMbpsArray[2];
      case '4g':
        return equivalentMbpsArray[3];
      default:
        break;
    }
  }
  // finally we have navigator.connection.type - this won't help much 
  if (typeof navigator.connection.type === 'string' && navigator.connection.type !== '') {
    switch (navigator.connection.type) {
      case 'ethernet':
      case 'wifi':
      case 'wimax':
        return 1;
      case 'bluetooth':
        return 0.35;
    }
    // there is no point in guessing bandwidth when navigator.connection.type is cellular this can vary from 0 to 100 Mbps 
    // better to admit we do not know and find another way to detect bandwidth (likely from AJAX/Fetch if required)
  }
  // nothing worked - exit
  return null;
};

exports.RMPCONNECTION = RMPCONNECTION;

},{}]},{},[1]);
