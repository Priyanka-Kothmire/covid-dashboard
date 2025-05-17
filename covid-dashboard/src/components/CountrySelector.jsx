const CountrySelector = ({ countries, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="" disabled selected>
        Search Country
      </option>


      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
