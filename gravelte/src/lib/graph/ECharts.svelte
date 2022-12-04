<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	export let idchart: string;
	// export let theme: string;
	export let width = 200;
	export let height = 200;

	export let option: echarts.EChartsOption;
	export let notMerge = false;
	export let lazyUpdate = false;

	let chart: echarts.ECharts; // our chart instance

	const setOption = () => {
		if (chart && !chart.isDisposed()) {
			chart.setOption(option, notMerge, lazyUpdate);
		}
	};

	const destroyChart = () => {
		if (chart && !chart.isDisposed()) {
			chart.dispose();
		}
	};

	const makeChart = () => {
		destroyChart();
		const chartElem = document.getElementById(idchart);
		if (chartElem != null) {
			chart = echarts.init(chartElem);
		}
	};

	onMount(() => {
		makeChart();
	});

	onDestroy(() => {
		destroyChart();
	});

	let timeoutId: any;
	const handleResize = () => {
		if (timeoutId == undefined) {
			timeoutId = setTimeout(() => {
				if (chart && !chart.isDisposed()) {
					chart.resize();
				}
				timeoutId = undefined;
			}, 500);
		}
	};

	$: width && handleResize();
	$: option && setOption();
	$: if (chart) {
		makeChart();
		setOption();
	}
</script>

<div bind:clientWidth={width}>
	<div id={idchart} style="height: {height}px" />
</div>
