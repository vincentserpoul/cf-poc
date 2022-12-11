import type { PageServerLoad } from './$types';

import { fetchRunRadonRisks, radonRisksToNameValues } from '$lib/external/radonRisks';

export const load: PageServerLoad = async ({ fetch }) => {
	const radonRisks = await fetchRunRadonRisks(fetch);
	const graphRadonRisks = await radonRisksToNameValues(radonRisks);

	return {
		graphRadonRisks: graphRadonRisks
	};
};
