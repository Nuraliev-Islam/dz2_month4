import { useState } from "react";
import './app.css'
import axios from 'axios'

const App = () => {
    const [data, setData] = useState();
    const [city, setCity] = useState();
    const KEY = '9a61f229741aa856d43699768e4fe3da';
  
    const getWeather = (city) => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`)
        .then(({ data }) => {
          const allForecasts = data.list;
          const dailyForecasts = allForecasts.filter(forecast =>
            forecast.dt_txt.includes('12:00:00')
          ).slice(0, 4);
          setData(dailyForecasts);
          console.log(dailyForecasts);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о погоде:', error);
          setData();
        });
    };

    return (
        <div className="cont">
            <div className="flex">
                <input type="text" onChange={(event) => setCity(event.target.value)} />
                <button onClick={() => getWeather(city)}>Поиск</button>
            </div>
            {
                data &&
                (
                    <div>
                        <h1>{city}</h1>
                        <div className="flex2">
                        <img src={`https://openweathermap.org/img/wn/${data[3].weather[0]?.icon}@2x.png`} alt="WeatherIcon" />
                        <h2>{(data[3].main.temp).toFixed(0)}°c</h2>
                        </div>
                        <h2>{data[3].sys.country}</h2>
                        {/* <h2>{data[3].weather[0]?.description}</h2> */}
                        {/* <h2>{data[3].weather[0]?.main}</h2> */}
                    </div>
                )
            }
        </div>
    );
}

export default App;








