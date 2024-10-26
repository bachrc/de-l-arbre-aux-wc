import { calculYield, tdsMoyen, yieldMoyen, type Extraction } from './extractions.ts';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart, type ChartItem, type ChartConfiguration } from 'chart.js';
import {
  LIMITE_TDS_FAIBLESSE,
  LIMITE_TDS_FORCE,
  LIMITE_YIELD_SOUS_EXTRACTION,
  LIMITE_YIELD_SUR_EXTRACTION
} from './verdict.ts';

export function setupChart(node: ChartItem, extraction: Extraction): Chart {
  const config: ChartConfiguration = {
    type: 'scatter',
    plugins: [annotationPlugin],
    options: {
      responsive: true,
      animation: false,
      plugins: {
        annotation: {
          annotations: {
            weak_and_underextracted: {
              type: 'box',
              xMin: 0,
              xMax: LIMITE_YIELD_SOUS_EXTRACTION,
              yMin: 0,
              yMax: LIMITE_TDS_FAIBLESSE,
              backgroundColor: 'rgba(0, 125, 200, 0.20)'
            },
            underextracted: {
              type: 'box',
              xMin: 0,
              xMax: LIMITE_YIELD_SOUS_EXTRACTION,
              yMin: LIMITE_TDS_FAIBLESSE,
              yMax: LIMITE_TDS_FORCE,
              backgroundColor: 'rgba(0, 125, 200, 0.40)'
            },
            strong_and_underextracted: {
              type: 'box',
              xMin: 0,
              xMax: LIMITE_YIELD_SOUS_EXTRACTION,
              yMin: LIMITE_TDS_FORCE,
              yMax: 2,
              backgroundColor: 'rgba(0, 125, 200, 0.60)'
            },
            weak: {
              type: 'box',
              xMin: LIMITE_YIELD_SOUS_EXTRACTION,
              xMax: LIMITE_YIELD_SUR_EXTRACTION,
              yMin: 0,
              yMax: LIMITE_TDS_FAIBLESSE,
              backgroundColor: 'rgba(39, 212, 82, 0.2)'
            },
            ideal: {
              type: 'box',
              xMin: LIMITE_YIELD_SOUS_EXTRACTION,
              xMax: LIMITE_YIELD_SUR_EXTRACTION,
              yMin: LIMITE_TDS_FAIBLESSE,
              yMax: LIMITE_TDS_FORCE,
              backgroundColor: 'rgba(39, 212, 82, 0.4)'
            },
            strong: {
              type: 'box',
              xMin: LIMITE_YIELD_SOUS_EXTRACTION,
              xMax: LIMITE_YIELD_SUR_EXTRACTION,
              yMin: LIMITE_TDS_FORCE,
              yMax: 2,
              backgroundColor: 'rgba(39, 212, 82, 0.6)'
            },
            weak_and_overextracted: {
              type: 'box',
              xMin: LIMITE_YIELD_SUR_EXTRACTION,
              xMax: 30,
              yMin: 0,
              yMax: LIMITE_TDS_FAIBLESSE,
              backgroundColor: 'rgba(200, 75, 0, 0.2)'
            },
            overextracted: {
              type: 'box',
              xMin: LIMITE_YIELD_SUR_EXTRACTION,
              xMax: 30,
              yMin: LIMITE_TDS_FAIBLESSE,
              yMax: LIMITE_TDS_FORCE,
              backgroundColor: 'rgba(200, 75, 0, 0.4)'
            },
            strong_and_overextracted: {
              type: 'box',
              xMin: LIMITE_YIELD_SUR_EXTRACTION,
              xMax: 30,
              yMin: LIMITE_TDS_FORCE,
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
          data: [{ x: yieldMoyen(extraction), y: tdsMoyen(extraction) }],
          radius: 6
        }
      ]
    }
  };

  return new Chart(node, config);
}
