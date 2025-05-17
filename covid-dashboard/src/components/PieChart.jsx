import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const totalCases = Object.values(data.cases).pop();
  const totalRecovered = Object.values(data.recovered).pop();
  const totalDeaths = Object.values(data.deaths).pop();
  const totalPopulation = 140000000;
  const remaining = totalPopulation - (totalCases || 0);

  const chartData = {
    labels: ['Cases', 'Recovered', 'Deaths', 'Total Population'],
    datasets: [
      {
        data: [totalCases, totalRecovered, totalDeaths, remaining],
        backgroundColor: ['#007bff', '#28a745', '#FF4D4D', '#e9e48c'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15,
          
          filter: (legendItem, data) => legendItem.text === 'Total Population',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let value = context.formattedValue;
            if (context.label === 'Total Population') {
              return `140 M ${context.label}`;
            }
            return `${value} ${context.label}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', height: '230px', margin: 'auto' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
