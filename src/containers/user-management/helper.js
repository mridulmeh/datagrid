import { keyGenerator } from "../../utils";

export const prepareHeaderData = (data) => {
	const setofKeys = keyGenerator(data);
	return [[{
		key: 'mainHeader',
		name: 'Shipment Manager',
		noSort: true,
		colSpan: setofKeys.length - 1
	}, {
		key: 'search',
		name: 'Search',
		noSort: true,
		elem: {
			name: 'input',
			attr: {
				placeholder: 'Search',
				className: 'search-button'
			},
			events: {
				onChange: function (props, val) {
					props.updateFilters(val) ;
				}
			}
		}
	}],setofKeys];
};