<script lang="ts">
	import type { NameValue } from '$lib/graph/NameValue';
	import { fetchBeers, beersToNameValues } from './beer';

	import EPie from '$lib/graph/EPie.svelte';

	import { onMount } from 'svelte';

	let graphBeers: NameValue[];

	onMount(async () => {
		let beers = await fetchBeers();
		graphBeers = await beersToNameValues(beers);
	});
</script>

<div class="container mx-auto">
	{#if graphBeers}
		<EPie idpie="beers" nameValues={graphBeers} />
	{/if}
</div>
