export const url =
	'https://static.data.gouv.fr/resources/connaitre-le-potentiel-radon-de-ma-commune/20190506-174309/radon.csv';

export interface RadonRisk {
	nom_comm: string;
	nom_dept: string;
	insee_com: string;
	classe_potentiel: number;
	reg: string;
}

import Papa from 'papaparse';

function parsePromise(dataurl: string) {
	return new Promise(function (complete, error) {
		Papa.parse(dataurl, {
			header: true,
			download: true,
			worker: true,
			complete,
			error
		});
	});
}

export async function fetchRadonRisks(): Promise<RadonRisk[]> {
	const radonRisksResults = await parsePromise(url);

	return radonRisksResults.data as RadonRisk[];
}

import type { NameValue } from '$lib/graph/NameValue';

export async function radonRisksToNameValues(radonRisks: RadonRisk[]): Promise<NameValue[]> {
	return radonRisks.map((radonRisk) => ({
		name: radonRisk.nom_comm,
		value: radonRisk.classe_potentiel
	}));
}
