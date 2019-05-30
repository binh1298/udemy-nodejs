const request = require("request");
const darkskyUrl =
  "https://api.darksky.net/forecast/e79120fdb95d94fb7928b23968104efc/";
const darkskyQuery = "?units=si";

const getWeatherInfo = (geocode, callback) => {
  request({ url: darkskyUrl + geocode + darkskyQuery, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to Weather Service!");
    } else if (body === "Forbidden\n") {
      callback("Incorrect API Access Token");
    } else if(body.error){
      callback(body.error)
    }else{
      callback(undefined, "It is currently " +
      body.currently.temperature +
        " degress out in " +
        body.timezone +
        ". There is a " +
        body.currently.precipProbability +
        "% change of rain", body.daily.summary)
    }
  });
};

module.exports = {
  forecast:getWeatherInfo
}