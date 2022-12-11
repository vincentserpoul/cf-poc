export const url =
	'http://static.data.gouv.fr/resources/connaitre-le-potentiel-radon-de-ma-commune/20190506-174309/radon.csv';

export interface RadonRisk {
	nom_comm: string;
	nom_dept: string;
	insee_com: string;
	classe_potentiel: number;
	reg: string;
}

import type { NameValue } from '$lib/graph/NameValue';

export async function radonRisksToNameValues(radonRisks: RadonRisk[]): Promise<NameValue[]> {
	return radonRisks.map((radonRisk) => ({
		name: radonRisk.nom_comm,
		value: radonRisk.classe_potentiel
	}));
}

// browser
import Papa from 'papaparse';

const papaPromise = (text: string): Promise<Papa.ParseResult<RadonRisk>> =>
	new Promise((resolve, reject) => {
		Papa.parse(text, {
			header: true,
			complete: function (results: Papa.ParseResult<RadonRisk>) {
				resolve(results);
			},
			error: function (error: unknown) {
				reject(error);
			}
		});
	});

async function fetchParseV8Promise(fetch: unknown): Promise<Papa.ParseResult<RadonRisk>> {
	const resp = await fetch(url);
	const csv: string = await resp.text();

	return papaPromise(csv);
}

export async function fetchV8RadonRisks(fetch: unknown): Promise<RadonRisk[]> {
	const radonRisksResults: Papa.ParseResult<RadonRisk> | Papa.ParseError =
		await fetchParseV8Promise(fetch);

	return radonRisksResults.data;
}

export async function fetchRunRadonRisks(fetch: unknown): Promise<RadonRisk[]> {
	const resp = await fetch('https://stats-run-v2ygn4isha-as.a.run.app/radonrisks');

	return resp.json();
}
