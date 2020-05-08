'use strict';

var request = require("r2");

exports.getWeatherByCity = async(city) => {
  try {

    var baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="+ global.WEATHERAPPKEY +"&units=metric";
    const response = await request(baseUrl).json;        

    return response;
  } catch (error) {
    return error;
  }
};