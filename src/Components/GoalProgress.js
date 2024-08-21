import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalProgress = ({ percentage }) => {
  const data = {
    labels: ['Goal Progress'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${value}%`;
          },
        },
      },
    },
    circumference: Math.PI, // Half circle
    rotation: -Math.PI, // Start from top
  };

  return (
    <div className="goal-progress">
      <h2>Goal Progress</h2>
      <Doughnut
        data={data}
        options={options}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default GoalProgress;
