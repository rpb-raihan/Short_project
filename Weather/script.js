async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "e08b7fc6a7808343f6dcd30c5c88a55a";

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 404 || data.cod === "404") {
      throw new Error("City not found");
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    document.getElementById("weatherResult").innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${temp}°C</strong></p>
      <p>${description}</p>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
