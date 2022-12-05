<script lang="ts">
	import type { NameValue } from '$lib/graph/NameValue';
	import { fetchRadonRisks, radonRisksToNameValues } from './radonRisk';

	import EPie from '$lib/graph/EPie.svelte';

	import { onMount } from 'svelte';

	let graphRadonRisks: NameValue[];

	onMount(async () => {
		let radonRisks = await fetchRadonRisks();
		graphRadonRisks = await radonRisksToNameValues(radonRisks);
	});
</script>

<div class="container mx-auto">
	{#if graphRadonRisks}
		<EPie idpie="radonRisks" nameValues={graphRadonRisks} />
	{/if}
</div>
