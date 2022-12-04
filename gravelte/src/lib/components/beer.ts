export const url = 'https://https://api.punkapi.com/v2/beers';

export interface Beer {
	_id: ID;
	beer: string;
	brewery: string;
	type: string[];
	alcoholpercentage: number;
}

export interface ID {
	$oid: string;
}

export async function fetchBeers(): Promise<Beer[]> {
	const res = await fetch(url, {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	});
	const beers: Beer[] = await res.json();

	return beers;
}

import type { NameValue } from '$lib/graph/NameValue';

export async function beersToNameValues(beers: Beer[]): Promise<NameValue[]> {
	return beers.map((beer) => ({
		name: beer.beer + '(' + beer.type + ', ' + beer.brewery + ')',
		value: beer.alcoholpercentage
	}));
}
