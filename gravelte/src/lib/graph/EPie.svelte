<script lang="ts">
	import ECharts from './ECharts.svelte';
	import type { NameValue } from './NameValue';

	export let nameValues: NameValue[];
	export let idpie: string;

	let option: echarts.EChartsOption;

	$: {
		option = {
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					name: 'Radius Mode',
					type: 'pie',
					radius: [200, 500],
					roseType: 'area',
					itemStyle: {
						borderRadius: 5
					},
					label: {
						show: false
					},
					data: nameValues
				}
			]
		};
	}
</script>

{#if nameValues && nameValues.length > 0}
	<div id={idpie} class="pie">
		<ECharts idchart={idpie} {option} />
	</div>
{/if}

<style>
	.pie {
		height: 100vh;
		width: 90vw;
	}
</style>
