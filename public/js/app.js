const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  fetch("/weather?location=" + location).then(
    response => {
      response.json().then(data => {
        const messenger = document.querySelector("#messenger");
        messenger.innerHTML = data.errorMsg || data.forecastMsg + data.forecastSummary;
      });
    }
  );
});
