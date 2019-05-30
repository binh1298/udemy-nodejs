const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (req.query.location) {
    geocode.getGeoCode(req.query.location, (error, GeoCode) => {
      if (error) {
        return res.send({
          errorMsg: error
        });
      } else {
        forecast.forecast(GeoCode, (error, forecastMsg, forecastSummary) => {
          if (error) {
            return res.send({
              errorMsg: error
            });
          } else {
            return res.send({
              errorMsg: error,
              location: req.query.location,
              forecastMsg: forecastMsg,
              forecastSummary: forecastSummary
            });
          }
        });
      }
    });
  }
});
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dante"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dante"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dante",
    errorMsg: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
