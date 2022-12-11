<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	
	import RadonRisks from '$lib/components/RadonRisks.svelte';
</script>

<RadonRisks graphRadonRisks={data.graphRadonRisks} />
