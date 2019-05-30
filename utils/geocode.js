const request = require("request");
const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxQuery =
  "?access_token=pk.eyJ1IjoiYmluaDEyOTgiLCJhIjoiY2p2ejJ0NXRmMGU0ODRibzU5d3k5c3Q3eiJ9.tWnYXecjr9U-nyDR7PyQEw&limit=1";

var getGeoCode = (searchKeyWords, callback, geoCodeAPIUrl = mapboxUrl, query = mapboxQuery) => {
  const url = geoCodeAPIUrl + searchKeyWords + ".json" + query;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Map Service!");
    } else if (body.message) {
      callback(geoInfo.message);
    } else if (!body.features[0]) {
      callback("Unable to find your place");
    } else {
      callback(undefined, body.features[0].center.reverse().toString());
    }
  });
};

module.exports = {
  getGeoCode: getGeoCode
};
