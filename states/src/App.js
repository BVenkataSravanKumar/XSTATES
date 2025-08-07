import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
        setCountries([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setStates(data);
          } else {
            setStates([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching states:', err);
          setStates([]);
        });
    } else {
      setStates([]);
    }

    setSelectedState('');
    setSelectedCity('');
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCities(data);
          } else {
            setCities([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching cities:', err);
          setCities([]);
        });
    } else {
      setCities([]);
    }
    setSelectedCity('');
  }, [selectedCountry, selectedState]);

  return (
    <div className="wrapper">
      <h1>Select Location</h1>

      <div className="drop-down">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">-- Choose a Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">-- Choose a State --</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">-- Choose a City --</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {(selectedCountry && selectedState && selectedCity) && (
        <p className="summary">
          You have selected {selectedCountry}, {selectedState}, {selectedCity}
        </p>
      )}
    </div>
  );
}

export default App;
