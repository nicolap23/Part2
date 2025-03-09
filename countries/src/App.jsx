import { useEffect, useState } from 'react'
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY
console.log(API_KEY); 

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [weatherData, setWeatherData] = useState({});


  

  const toggleDetails = (country) => {
    const countryCode = country.cca3;
    setShowDetails((prev) => ({
      ...prev,
      [countryCode]: !prev[countryCode], 
    }));

    if (!weatherData[countryCode] && country.capitalInfo?.latlng) {
      fetchWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1], countryCode);
    }
  };




  const fetchWeather = (lat, lon, countryCode) => {
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(response => {
      setWeatherData(prev => ({
        ...prev,
        [countryCode]: response.data 
      }));
    })
    .catch(error => console.error("Error fetching weather data:", error));
  };


  useEffect(() =>{

    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response =>{

      setCountries(response.data)
      
    })

  },[])
 

  useEffect(() =>{
    if(search.trim ===""){
      setFilteredCountries([])
      return;
    }

    const results = countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredCountries(results)
  },[search, countries])

  return (
    <div>
      <h1>World</h1>

      find countries<input type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>


      
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.map(country => (
          <div key={country.cca3}>
            <h3>{country.name.common}<button onClick={() => toggleDetails(country)}>Show</button></h3>

            {showDetails[country.cca3] && (
              <div>
                <p><strong>Capital:</strong> {country.capital?.[0] || "No info"}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <img src={country.flags.png} alt={country.name.common} width="100" />
              
                {weatherData[country.cca3] && (
                  <div>
                    <h4>Weather in {country.capital?.[0]}</h4>
                    <p><strong>Temperature:</strong> {weatherData[country.cca3].main.temp} °C</p>
                    <p><strong>Wind:</strong> {weatherData[country.cca3].wind.speed} m/s</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData[country.cca3].weather[0].icon}@2x.png`}
                      alt={weatherData[country.cca3].weather[0].description}
                    />
                  </div>
                )}
              
              
              
              </div>
            )}
            
          </div>
        ))}  

        
      
      
      
    </div>
  )
}

export default App
