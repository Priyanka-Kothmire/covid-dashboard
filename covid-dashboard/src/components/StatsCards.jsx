import '../App.css';

const StatsCards = ({ data }) => {
  const latestDate = Object.keys(data.cases).pop();
  const totalCases = data.cases[latestDate];
  const totalRecovered = data.recovered[latestDate];
  const totalDeaths = data.deaths[latestDate];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const cards = [
    {
      label: 'Total Cases',
      value: formatNumber(totalCases),
      percentage: '0.002%',
      color: '#6366f1', 
    },
    {
      label: 'Recoveries',
      value: formatNumber(totalRecovered),
      percentage: '0.002%',
      color: '#22c55e', 
    },
    {
      label: 'Deaths',
      value: formatNumber(totalDeaths),
      percentage: '0.002%',
      color: '#ef4444', 
    },
  ];

  return (
    <div className="stats-cards-new">
      {cards.map((card, index) => (
        <div key={index} className="pill-card">
          <div
            className="pill-left"
            style={{ backgroundColor: card.color }}
          >
            <div className="pill-label">{card.label}</div>
            <div className="pill-percentage">{card.percentage}</div>
          </div>
          <div className="pill-right">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
