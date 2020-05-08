'use strict';

const clientWheather = require('../clients/openweather-client')
const repositoryMusic = require('../repositories/music-repositorie')
const repositoryLog = require('../repositories/log-repositorie')

exports.getMusicsByTemp = async (city) => {

    var responseWheater = await clientWheather.getWeatherByCity(city);     
    var musics

    switch (true) {
        case (responseWheater.main.temp > 25):
            musics = await repositoryMusic.searchMusic("Pop")            
          break;
        case (responseWheater.main.temp <= 25 && responseWheater.main.temp >= 10):
            musics = await repositoryMusic.searchMusic("Rock")            
          break;
        case (responseWheater.main.temp < 10):
            musics = await repositoryMusic.searchMusic("Classico")
            break;
      }      

      var response = {
        city: city,
        temperature: responseWheater.main.temp,
        musics : musics
      }

      await repositoryLog.criarlog(response);

      return response;

}