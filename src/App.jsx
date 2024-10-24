import { useState } from 'react'
import './App.css'
import Teste from './teste.jsx'

function App() {
  // minha chave de api
  const apikey = "33f42d845ad12028f00826ef78ede4c2";

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperatura: '',
    descricao: '',
    umidade: '',
    vento: '',
  });

  // Função para manipular a mudança do input e deixar em tempo real (nao sei o nome)
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Função para buscar o clima
  const getWeather = async (city) => {
    console.log(`Buscando o clima para a cidade: ${city}`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric `);
    const data = await response.json();
    setWeatherData({
      temperatura: data.main.temp,
      descricao: data.weather[0].description,
      umidade: data.main.humidity,
      vento: data.wind.speed,
    });
  };

  // Função chamada ao clicar no botão buscar
  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div className="fundo">
      <div className="container text-center p-5">
        <div className="form">
          <Teste texto={'Encontre o clima da sua cidade aqui'} />
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Digite a sua cidade"
              value={city}
              onChange={handleCityChange}
              id="city-input"
            />

            <button className="btn btn-primary" onClick={handleSearch} id="busca">
              Buscar
              <i className="fa-solid fa-magnifying-glass ms-2"></i>
            </button>
          </div>
        </div>

        {/* Dados do tempo */}
        <div id="dadosTempo" className="mt-4">
          <h2>
            {/* good view city === boa vista */}
            <span id='cidade'>{city || 'Good View City'}</span>
            <i className="p-1 fa-solid fa-location-dot"></i>
          </h2>
          <p id='temperatura'>
            <span>{weatherData.temperatura || '400'}</span>&deg;C
          </p>
          <div id='descricao-tempo'>
            <i className="fa-solid fa-cloud-sun"></i>
            <p id='descricao'>{weatherData.descricao || 'Chuva'}</p>
          </div>

          <div id="details-container">
            <p id="umidade">
              <i className="fa-solid fa-droplet"></i> 
              <span>{weatherData.umidade || '50'}%</span>
            </p>
            <p id="vento">
              <i className="fa-solid fa-wind"></i>
              <span>{weatherData.vento || '10'} km/h</span>
            </p>
          </div>
          
        </div>

        <div className='card-cidade card-group w-100'>

          <div className='card card-body m-2'><h2>Manaus</h2></div>

          <div className='card card-body m-2'><h2>Boa Vista</h2></div>

          <div className='card card-body m-2'><h2>Pará</h2></div>

        </div>


      </div>
    </div>
      
   
  );
}

export default App;
