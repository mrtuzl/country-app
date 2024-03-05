import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React from 'react';
import Header from './components/Header';
const Card = React.lazy(() => import('./components/Card'));
const DetailCard = React.lazy(() => import('./components/DetailCard'));
import {Suspense} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Select from 'react-select'
import Footer from './components/Footer';

function App() {

 const[fetchData, setFetchData] = useState(true);
 const[countries, setCountries] = useState([]);
 const[selectedCard, setSelectedCard] = useState(" ");
 const[country, setCountry] = useState([]);
 const[filter, setFilter] = useState(" ");
 const[search, setSearch] = useState(" ");
 const[isSearch, setIsSearch] = useState(false);
 const[mode, setMode] = useState(true);

 const toggleMode = () => {
  setMode(!mode)
 }

 const baseUrl = 'https://restcountries.com/v3.1';


 useEffect(() => {
    fetch(`${baseUrl}/all`)
      .then((response) => response.json())
      .then((res) => {
        function flatten(arr) {
          if (Array.isArray(arr)) {
            return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
          } else {
            return [arr]; // Eğer res bir dizi değilse, onu tek elemanlı bir dizi olarak dönüştürür
          }
        }
        const flattenedArray = flatten(res);
        const allCountries = flattenedArray.map((data) => ({
          id: data.name.official,
          name: data.name.common,
          capital: data.capital,
          img: data.flags.png,
          population: data.population,
          region: data.region
        }));
        setCountries(allCountries);
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  }, []);


    useEffect(() => {
        if (selectedCard.length > 1) {
          fetch(`${baseUrl}/name/${selectedCard}`)
            .then((response) => response.json())
            .then((res) => {
              function flatten(arr) {
                if (Array.isArray(arr)) {
                  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
                } else {
                  return [arr]; // Eğer res bir dizi değilse, onu tek elemanlı bir dizi olarak dönüştürür
                }
              }
              const flattenedArray = flatten(res);
              const countryData = flattenedArray.map((data) => ({
                  
              id: data.name.official,
              name: data.name.common,
              nameOfficial: data.name.official,
              capital: data.capital,
              img: data.flags.png,
              population: data.population,
              region: data.region,
              subRegion: data.subregion,
              currencies: Object.values(data.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', '),
              languages: Object.values(data.languages).join(', '),
              borders: [data.borders].join(', '),
              map: data.maps.openStreetMaps
              }));
                setCountry(countryData);
            }).catch((error) => {
              console.error('Fetch Error:', error);
            });
            
        }
      }, [selectedCard]);




useEffect(() => {
  if (isSearch) {
    fetch(`${baseUrl}/name/${search}`)
      .then((response) => response.json())
      .then((res) => {
        function flatten(arr) {
          if (Array.isArray(arr)) {
            return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
          } else {
            return [arr]; // Eğer res bir dizi değilse, onu tek elemanlı bir dizi olarak dönüştürür
          }
        }
        const flattenedArray = flatten(res);
        const allCountries = flattenedArray.map((data) => ({
          id: data.name.official,
          name: data.name.common,
          capital: data.capital,
          img: data.flags.png,
          population: data.population,
          region: data.region
        }));
        setCountries(allCountries);
        setIsSearch(false)
      }).catch((error) => {
        console.error('Fetch Error:', error);
        setIsSearch(false)
      });
  }
}, [isSearch]);

useEffect(() => {
  if (filter.length > 1) {
    fetch(`${baseUrl}/region/${filter}`)
      .then((response) => response.json())
      .then((res) => {
        function flatten(arr) {
          if (Array.isArray(arr)) {
            return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
          } else {
            return [arr]; // Eğer res bir dizi değilse, onu tek elemanlı bir dizi olarak dönüştürür
          }
        }
        const flattenedArray = flatten(res);
        const allCountries = flattenedArray.map((data) => ({
          id: data.name.official,
          name: data.name.common,
          capital: data.capital,
          img: data.flags.png,
          population: data.population,
          region: data.region
        }));
        setCountries(allCountries);
      }).catch((error) => {
        console.error('Fetch Error:', error);
      });
  }
}, [filter]);

const options = [
  { value: 'africa', label: 'Africa' },
  { value: 'america', label: 'America' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania'},
  { value: 'antarctic', label: 'Antarctic'}
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: mode ? 'white' : '#343a40',
    color: mode ? 'black' : 'white'
  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #ced4da',
    borderRadius: '4px'
  })
};

  return (
    <Router>
      <div className={`container-fluid ${mode ? "bg-light light" : "bg-dark dark"} `}> 
          <div className='row'> 
              <div className='col-xl-12 d-flex flex-column'> 
                  <Header search={search}
                  setSearch={setSearch}
                  isSearch={isSearch}
                  setIsSearch={setIsSearch}
                  mode={mode}/>
              </div>
            </div>

            <div className='row'> 
                <div className='col-xl-12 d-flex justify-content-end mobile'>
                  <Select className='select'
                  placeholder="Filter by region" 
                  options={options} 
                  styles={customStyles}
                  onChange={(selectedOption) => setFilter(selectedOption.value)}/>
                </div>
            </div>

            <div className='row'> 
                <div className='col-xl-12 d-flex justify-content-end mobile'>
                    <div className="form-check form-switch d-flex align-items-center p-3 ">
                    <input className="form-check-input m-1" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckChecked"  
                    defaultChecked
                    onChange={toggleMode}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked"> {mode ? <span> Light Mode </span> : <span> Dark Mode</span>}</label>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-xl-12 d-flex flex-wrap justify-content-center'>
                  <Routes>
                    {
                  selectedCard.length > 1 ?
                  (
                    <Route path="/" element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <DetailCard
                          country={country}
                          selectedCard={selectedCard}
                          setSelectedCard={setSelectedCard}
                          mode={mode}
                        />
                      </Suspense>
                    } />
                  ) :
                  (
                    <Route path="/" element={
                      <Suspense fallback={<div>Loading...</div>}>
                    <Card
                      countries={countries}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                      mode={mode}
                      />
                      </Suspense> } />
                  )
                    }
                  </Routes>
              </div>
          </div>
          <div className='row'>
                <div className='col-xl-12 d-flex justify-content-center'>
                    <Footer mode={mode}/>
                </div>
          </div>
      </div>
    </Router>
  )
}
export default App