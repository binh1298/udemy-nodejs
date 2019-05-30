console.log("Client side javascript file is loaded!");

fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?location=" + location).then(
    response => {
      response.json().then(data => {
        const messenger = document.querySelector("#messenger");
        messenger.innerHTML = data.errorMsg || data.forecastMsg + data.forecastSummary;
      });
    }
  );
});
