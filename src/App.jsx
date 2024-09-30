import React, { useState } from "react";

const WeatherApp = () => {
  const API_KEY = "7c0c32936d882a38fd2197fc205d3e61";
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setError(""); // Reset error message
    setWeather(null); // Reset weather data

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw Error("City not found");
      }
      const weatherData = await response.json();
      setWeather(weatherData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-gray-700 mb-8">
          Weather App
        </h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter City"
            className="w-3/4 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="w-1/4 p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
            onClick={() => fetchWeather(cityName)}
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {weather && (
          <div className="text-center text-gray-800">
            <h2 className="text-3xl font-semibold">City: {weather.name}</h2>
            <p className="text-xl">Humidity: {weather.main.humidity}%</p>
            <p className="text-xl">
              Atmosphere: {weather.weather[0].description}
            </p>
            <p className="text-xl">
              Temperature:{" "}
              <span className="font-semibold">
                {Math.round(weather.main.temp)}
              </span>
              °C
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
