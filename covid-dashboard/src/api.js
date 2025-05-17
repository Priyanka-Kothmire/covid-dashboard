import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data.map(country => ({
    name: country.name.common,
    code: country.cca2.toLowerCase()
  })).sort((a, b) => a.name.localeCompare(b.name));
};

export const fetchHistoricalData = async (countryCode = 'us') => {
  const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`);
  return response.data;
};
