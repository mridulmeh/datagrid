import React from 'react';
import arrow from '../../images/down-arrow.png';

// Map Sort Algorithms
const sortMap = {
	string: (a, b) => a.localeCompare(b),
	number: (a, b) => a - b
};

// Sorting Function to sort by type
const sortByType = (a = '', b = '', mode, type) => {

	const checker = sortMap[type](a, b);

	return mode === 'desc' ? -checker : checker;
};

// Sorting a JSON with sort params (key, mode)
export const sortJsonArray = (data, sort) => {
	const {
		key,
		mode
	} = sort;

	return data.sort((a,b) => {
		let type = 'number';
		if(isNaN(a[key])){
			type = 'string';
		}
		return sortByType(a[key], b[key], mode, type);
	});
};

// Filter datum based on search criteria
const filterDatum = (datum, value = '') =>
	datum ? datum.toUpperCase().indexOf(value.toUpperCase()) > -1 : 1;

// Filtering JSON based on search criteria
export const filterJson = (data, filter) => {
	const {
		keys,
		value
	} = filter;
 	return data.filter(datum =>	keys.length ?
		keys.some(key => filterDatum(datum[key], value) ) : 1);
};

// Get Data to be viewed on current page
export const generateViewData = (data, paginationInfo) => {
	const {
		size,
		visibilityPointer
	} = paginationInfo;

	const actualVisPtr = Math.max(0, visibilityPointer);

	const startPointer = size * actualVisPtr;
	const endPointer = size * (actualVisPtr + 1);
	const pages = Math.ceil(data.length / size);

	let actualData = [];
	if(data.length > startPointer) {
		actualData = data.slice(startPointer, Math.min(endPointer, data.length));
	} else {
		actualData = data.slice((pages - 1) * size, data.length);
	}
	return actualData;
};

// Swaps sorting mode
export const swapMode = (mode) => {
	if(mode === 'desc'){
		return '';
	} return 'desc';
};

// Creates sorting inmages for headers
export const sortImage = (sortMode) => (<img
	src = {arrow}
	alt = {'sort'}
	className = {`table-component-arrow arrow-${sortMode === 'desc' ? 'down' : 'up'}`}>
</img>);
