import { calculYield, tdsMoyen, yieldMoyen, type Extraction } from './extractions.ts';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart, type ChartItem, type ChartConfiguration } from 'chart.js';

export function setupChart(node: ChartItem, extraction: Extraction): Chart {
  const config: ChartConfiguration = {
    type: 'scatter',
    plugins: [annotationPlugin],
    options: {
      animation: false,
      plugins: {
        annotation: {
          annotations: {
            weak_and_underextracted: {
              type: 'box',
              xMin: 0,
              xMax: 18,
              yMin: 0,
              yMax: 1.15,
              backgroundColor: 'rgba(0, 125, 200, 0.20)'
            },
            underextracted: {
              type: 'box',
              xMin: 0,
              xMax: 18,
              yMin: 1.15,
              yMax: 1.45,
              backgroundColor: 'rgba(0, 125, 200, 0.40)'
            },
            strong_and_underextracted: {
              type: 'box',
              xMin: 0,
              xMax: 18,
              yMin: 1.45,
              yMax: 2,
              backgroundColor: 'rgba(0, 125, 200, 0.60)'
            },
            weak: {
              type: 'box',
              xMin: 18,
              xMax: 22,
              yMin: 0,
              yMax: 1.15,
              backgroundColor: 'rgba(39, 212, 82, 0.2)'
            },
            ideal: {
              type: 'box',
              xMin: 18,
              xMax: 22,
              yMin: 1.15,
              yMax: 1.45,
              backgroundColor: 'rgba(39, 212, 82, 0.4)'
            },
            strong: {
              type: 'box',
              xMin: 18,
              xMax: 22,
              yMin: 1.45,
              yMax: 2,
              backgroundColor: 'rgba(39, 212, 82, 0.6)'
            },
            weak_and_overextracted: {
              type: 'box',
              xMin: 22,
              xMax: 30,
              yMin: 0,
              yMax: 1.15,
              backgroundColor: 'rgba(200, 75, 0, 0.2)'
            },
            overextracted: {
              type: 'box',
              xMin: 22,
              xMax: 30,
              yMin: 1.15,
              yMax: 1.45,
              backgroundColor: 'rgba(200, 75, 0, 0.4)'
            },
            strong_and_overextracted: {
              type: 'box',
              xMin: 22,
              xMax: 30,
              yMin: 1.45,
              yMax: 2,
              backgroundColor: 'rgba(200, 75, 0, 0.6)'
            }
          }
        }
      },
      scales: {
        x: {
          min: 14,
          max: 26,
          ticks: {
            display: true
          },
          title: {
            display: true,
            text: 'Yield'
          }
        },
        y: {
          min: 0.9,
          max: 1.8,
          position: 'top',
          ticks: {
            display: true
          },
          title: {
            display: false,
            text: 'TDS'
          }
        }
      }
    },
    data: {
      datasets: [
        {
          label: 'Extraction',
          backgroundColor: 'rgba(150, 0, 200, 0.8)',
          borderColor: 'rgba(150, 0, 200, 0.8)',
          data: extraction.releves_tds.map((releve_tds) => ({
            x: calculYield(extraction, releve_tds),
            y: releve_tds
          })),
          showLine: true
        },
        {
          label: 'TDS Moyen',
          backgroundColor: 'rgba(254, 70, 255, 1)',
          borderColor: 'rgba(254, 70, 255, 1)',
          data: [{ x: tdsMoyen(extraction), y: yieldMoyen(extraction) }],
          radius: 6
        }
      ]
    }
  };
  console.log(config);
  return new Chart(node, config);
}
