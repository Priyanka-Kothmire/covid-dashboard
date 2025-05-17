import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchCountries, fetchHistoricalData } from './api';
import CountrySelector from './components/CountrySelector';
import StatsCards from './components/StatsCards';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DateRangePicker from './components/DateRangePicker';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadData = async (countryCode) => {
    try {
      const result = await fetchHistoricalData(countryCode);
      setData(result.timeline);
    } catch (err) {
      setError('Failed to fetch historical data');
    }
  };

  useEffect(() => {
    const init = async () => {
      const countriesList = await fetchCountries();
      setCountries(countriesList);
    };
    init();
    loadData(selectedCountry);
  }, [selectedCountry]);

  const handleCountryChange = (code) => {
    setSelectedCountry(code);
    loadData(code);
  };

  const handleDateChange = (type, value) => {
    if (type === 'startDate') setStartDate(value);
    else if (type === 'endDate') setEndDate(value);
  };

  return (
    <div className="App">
      <h1>COVID-19 and Population Dashboard</h1>

      {error && <p className="error">{error}</p>}

      <div className="controls">
        <div className="left">
          <CountrySelector countries={countries} onSelect={handleCountryChange} />
        </div>
        <div className="right">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {data && (
        <>
          <StatsCards data={data} />

          <div className="charts">
            <div className="line-chart">
              <LineChart data={data} />
            </div>
            <div className="pie-chart">
              <PieChart data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;





 