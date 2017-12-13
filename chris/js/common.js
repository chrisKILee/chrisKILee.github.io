var moment = require('moment');


var obigo_in = moment("2006-07-20");
var obigo_out = moment('2015-11-10');
var daliworks_in = moment('2015-11-16');

var obigoDiff = obigo_out.diff(obigo_in);
var daliworksDiff = moment().diff(daliworks_in);
var obigoCarrier = moment.duration(obigoDiff);
var daliwokrsCarrier = moment.duration(daliworksDiff);

var allDiff = obigoDiff+daliworksDiff;
var allCarrier = moment.duration(allDiff);

console.log('obigo_carrier : ',obigoCarrier._data.years, 'year /', obigoCarrier._data.months, ' month');
console.log('dali_carrier : ',daliwokrsCarrier._data.years, 'year /', daliwokrsCarrier._data.months, ' month');
console.log('all_carrier : ',allCarrier._data.years, 'year /', allCarrier._data.months, ' month');



$(document).ready(function() {
    $(function () {
document.getElementById("dalicar").innerHTML = daliwokrsCarrier._data.years, ' year ', daliwokrsCarrier._data.months, ' month';
document.getElementById("tocar").innerHTML = allCarrier._data.years, ' year ', allCarrier._data.months, ' months';
document.getElementById("obicar").innerHTML = obigoCarrier._data.years+daliwokrsCarrier._data.years, ' year ', obigoCarrier._data.months+daliwokrsCarrier._data.months, ' month';
    });
});
