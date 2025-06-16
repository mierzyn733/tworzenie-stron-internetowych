const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


const latitude = 52.4064;
const longitude = 16.9252;


async function getWeatherData() {
  try {
    
    const currentResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
    );
    
    
    const forecastResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum,weather_code&timezone=auto&forecast_days=2`
    );
    
    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();
    
    return {
      current: currentData.current,
      tomorrow: {
        date: forecastData.daily.time[1],
        precipitation: forecastData.daily.precipitation_sum[1],
        weatherCode: forecastData.daily.weather_code[1]
      }
    };
  } catch (error) {
    console.error('Błąd pobierania danych pogodowych:', error);
    return null;
  }
}


function getTemperatureMessage(temp) {
  if (temp < 10) return 'Zimno! Zostań w domu.';
  if (temp < 20) return 'Przyjemnie! Idealna pogoda na spacer.';
  return 'Upał! Pamiętaj o nawodnieniu.';
}


function getPrecipitationMessage(precipitation, weatherCode) {
  // Kody pogodowe oznaczające opady: deszcz, śnieg, mżawka itp.
  const precipitationCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86];
  
  if (precipitation > 0.5 || precipitationCodes.includes(weatherCode)) {
    return 'Weź parasol - jutro mogą być opady!';
  }
  return 'Bez opadów - zachęcamy do wyjścia na spacer!';
}


router.get('/', async (ctx) => {
  const weatherData = await getWeatherData();
  
  if (!weatherData) {
    ctx.body = '<h1>Błąd pobierania danych pogodowych</h1>';
    return;
  }
  
  const { current, tomorrow } = weatherData;
  const temperatureMsg = getTemperatureMessage(current.temperature_2m);
  const precipitationMsg = getPrecipitationMessage(tomorrow.precipitation, tomorrow.weatherCode);
  
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Pogoda w Poznaniu</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
      .weather-card { background: #f5f5f5; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
      .current-weather { display: flex; justify-content: space-between; }
      .weather-icon { font-size: 3rem; text-align: center; }
      .temp { font-size: 2rem; font-weight: bold; }
      .message { padding: 15px; border-radius: 5px; margin: 10px 0; }
      .cold { background: #cfe8ff; border-left: 5px solid #2196F3; }
      .pleasant { background: #d8f5c0; border-left: 5px solid #4CAF50; }
      .hot { background: #ffdfdc; border-left: 5px solid #f44336; }
      .precipitation { background: #e3f2fd; border-left: 5px solid #2196F3; }
    </style>
  </head>
  <body>
    <h1>Pogoda w Poznaniu</h1>
    
    <div class="weather-card">
      <h2>Aktualna pogoda</h2>
      <div class="current-weather">
        <div>
          <div class="temp">${current.temperature_2m}°C</div>
          <div>Prędkość wiatru: ${current.wind_speed_10m} km/h</div>
        </div>
        <div class="weather-icon">⛅</div>
      </div>
      <div class="message ${current.temperature_2m < 10 ? 'cold' : current.temperature_2m < 20 ? 'pleasant' : 'hot'}">
        ${temperatureMsg}
      </div>
    </div>
    
    <div class="weather-card">
      <h2>Prognoza na jutro (${tomorrow.date})</h2>
      <div class="message precipitation">
        ${precipitationMsg}
      </div>
    </div>
    
    <p><small>Dane z <a href="https://open-meteo.com/" target="_blank">Open-Meteo</a></small></p>
  </body>
  </html>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});