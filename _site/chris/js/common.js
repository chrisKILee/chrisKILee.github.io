var moment = require('moment');

var before_in = moment("2002-11-01");
var fuze_in = moment("2005-10-01");
var obigo_in = moment("2006-07-20");
var obigo_out = moment('2015-11-10');
var daliworks_in = moment('2015-11-16');

var beforeFuzeDiff = fuze_in.diff(before_in);
var fuzeDiff = obigo_in.diff(fuze_in);
var obigoDiff = obigo_out.diff(obigo_in);
var daliworksDiff = moment().diff(daliworks_in);

var beforeFuzeCarrier = moment.duration(beforeFuzeDiff);
var fuzeWireCarrier = moment.duration(fuzeDiff);;
var obigoCarrier = moment.duration(obigoDiff);
var daliwokrsCarrier = moment.duration(daliworksDiff);

var allDiff = obigoDiff+daliworksDiff+beforeFuzeDiff+fuzeDiff;
var allCarrier = moment.duration(allDiff);


console.log('beforeFuze_carrier : ', beforeFuzeCarrier._data.years, 'year / ' , beforeFuzeCarrier._data.months, 'month')
console.log('fuzeWire_carrier : ', fuzeWireCarrier._data.years, 'year / ' , fuzeWireCarrier._data.months, 'month')
console.log('obigo_carrier : ',obigoCarrier._data.years, 'year /', obigoCarrier._data.months, ' month');
console.log('dali_carrier : ',daliwokrsCarrier._data.years, 'year /', daliwokrsCarrier._data.months, ' month');
console.log('all_carrier : ',allCarrier._data.years, 'year /', allCarrier._data.months, ' month');



$(document).ready(function() {
    $(function () {
document.getElementById("dalicar").innerHTML = daliwokrsCarrier._data.years, ' year ', daliwokrsCarrier._data.months, ' month';
document.getElementById("tocar").innerHTML = allCarrier._data.years, ' year ', allCarrier._data.months, ' months';
document.getElementById("obicar").innerHTML = obigoCarrier._data.years, ' year ', obigoCarrier._data.months, ' month';
    });
});
