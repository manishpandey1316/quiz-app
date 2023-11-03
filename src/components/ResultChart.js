import React, { useEffect, useRef } from 'react';
import {Chart,LinearScale,CategoryScale,BarController,BarElement} from 'chart.js';

function ResultChart({ quizResults }) {
  const chartRef = useRef();
  Chart.register(LinearScale, CategoryScale,BarController,BarElement);
  useEffect(() => {

    const ctx = chartRef.current.getContext('2d');

    
    const data = {
      labels: ['Correct', 'Incorrect', 'Skipped'],
      datasets: [
        {
          label: 'Quiz Results',
          data: quizResults,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', 
            'rgba(255, 99, 132, 0.2)', 
            'rgba(255, 206, 86, 0.2)', 
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      animation: {
        duration: 1000, 
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const quizChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

  
    return () => {
      quizChart.destroy();
    };
  }, [quizResults]);

  return (
    <div>
      <canvas  ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default ResultChart;
