'use strict';

var utils = {};

utils.getDurationTime = function (milliseconds) {
	var cons_day = 24 * 60 * 60 * 1000,
	cons_hour = 60 * 60 * 1000,
	days = Math.floor(milliseconds / cons_day),
	hours = Math.floor( (milliseconds - days * cons_day) / cons_hour),
	minutes = Math.floor( (milliseconds - days * cons_day - hours * cons_hour) / 60000),
	seconds = Math.round( (milliseconds - days * cons_day - hours * cons_hour - minutes*60000) / 1000),
	pad = function(n){ return n < 10 ? '0' + n : n; };
  if( minutes === 60 ){
    hours++;
    minutes = 0;
  }
  if( hours === 24 ){
    days++;
    hours = 0;
  }
  return [days, pad(hours), pad(minutes), pad(seconds)].join(':');
}

utils.generateInvoiceCode = function() {
  return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 9).toUpperCase();
};

module.exports = utils;