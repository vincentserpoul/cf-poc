<script lang="ts">
	import type { NameValue } from '$lib/graph/NameValue';

	import EPie from '$lib/graph/EPie.svelte';

	export let graphRadonRisks: NameValue[];
</script>

<div class="container mx-auto">
	<EPie idpie="radonRisks" nameValues={graphRadonRisks} />
</div>
