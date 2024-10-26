<script lang="ts">
  import {
    Chart,
    CategoryScale,
    LinearScale,
    ScatterController,
    PointElement,
    LineElement,
    type ChartItem,
    type ChartConfiguration
  } from 'chart.js';
  import { type Extraction } from '$lib/extractions';

  import annotationPlugin from 'chartjs-plugin-annotation';
  import { setupChart } from '$lib/chart_config';
  import { onMount } from 'svelte';

  Chart.register(
    CategoryScale,
    LinearScale,
    ScatterController,
    PointElement,
    LineElement,
    annotationPlugin
  );
  let {
    extraction
  }: {
    extraction: Extraction;
  } = $props();

  let ctx: CanvasRenderingContext2D;
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  $effect(() => {
    ctx = chartCanvas.getContext('2d')!;

    chart = setupChart(ctx, extraction);

    return () => {
      chart.destroy();
    };
  });
</script>

<canvas bind:this={chartCanvas} id="extractionChart" height={256}></canvas>
