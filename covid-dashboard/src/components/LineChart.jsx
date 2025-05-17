import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const LineChart = ({ data }) => {
  if (!data) return null; 

  const yearly = {}; 
  Object.keys(data.cases).forEach(date => {
    const year = date.split('/')[2]; 

    if (!yearly[year]) 
      yearly[year] = { cases: 0, deaths: 0, recovered: 0 }; 

    yearly[year].cases += data.cases[date];
    yearly[year].deaths += data.deaths[date];
    yearly[year].recovered += data.recovered[date];
  });

  const labels = Object.keys(yearly);

  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: labels.map(y => (yearly[y].cases / 1_000_000).toFixed(2)),
        borderColor: 'blue',
        tension: 0.4
      },
      {
        label: 'Recoveries',
        data: labels.map(y => (yearly[y].recovered / 1_000_000).toFixed(2)),
        borderColor: 'green',
        tension: 0.4
      },
      {
        label: 'Deaths',
        data: labels.map(y => (yearly[y].deaths / 1_000_000).toFixed(2)),
        borderColor: 'red',
        tension: 0.4
      }
    ]
  };

 
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: val => `${val}M` 
        }
      }
    },
    plugins: {
      legend: {
        display: false 
      }
    }
  };

  return (
    <div style={{ height: '230px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;




