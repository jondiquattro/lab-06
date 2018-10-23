'usr strict';


const express = require('express');

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());



app.get('/location', (request, response)=>{
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
  console.log(locationData)
})


function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location (geoData.results[0]);
//   console.log(geoData.results[0]);
  location.search_query = query;
  return location;

}

function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}


//get the weather
// makes a connection called weather just like /location
app.get('/weather', (request, response)=>{
  const weatherData = searchWeatherInfo(request.query.data);
  response.send(weatherData);
})


function searchWeatherInfo(){
  const weatherInfo = require('./data/darksky.json');
  const weather = weatherInfo.daily.data;
//   const arr=[];
//   let forecast ='';
//   let time = '';

//   weather.array.forEach(element => {
//       forecast = element.forecast;
//       time = element.time;
//       console.log(time);
//       arr.push({forecast,time});
//   });

//   const weather = new Weather (weatherInfo.daily.data);
//

  
  console.log(weather)[1];
    
//   weather.search_query = query;

  return weather;//getting sent to the website
}

// function Weather(daily){
//   this.forcast = daily.summary;
//   this.time = daily.time;
  
// }

//search weather




  
app.listen(PORT, ()=> console.log('app is up on ${PORT}'));


