import React from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import './table.css';
import TableFooter from './table-footer';
import { sortJsonArray, filterJson, generateViewData, swapMode } from './helper';

class TableCreator extends React.Component {

	constructor (props) {
		super(props);
		this.state = Object.assign({}, this.constructor.defatultState(), props.settings);
	}

	// Contains the default state of the component
	static defatultState () {
		return {
			sort: {
				key: '', mode: ''
			},
			filter: {
				keys: [], value: ''
			},
			page: {
				size: 20,
				visibilityPointer: 0
			}
		};
	}

	static getDerivedStateFromProps (props, state) {
		state.dataLength = Math.ceil(props.data / state.page.size);
		return state;
	}

	// Getting defualt events associated with each ever
	static getEvents (events = {}) {

		const headers = events.headers || {
			thead: {},
			tr: {},
			td: {}
		};
		const body = events.body || {
			thead: {},
			tr: {},
			td: {}
		};
		const footer = events.footer || {
			thead: {},
			tr: {},
			td: {}
		};
		return { body, headers, footer };
	}

	// Gets data to be viewed for current page
	getRenderData () {
		const {
			data
		} = this.props;
		const {
			sort,
			filter,
			page
		} = this.state;

		// Getting sorted and filtered data
		this.filteredData = filterJson(sortJsonArray(data, sort), filter);
		// Getting view data
		const viewData = generateViewData(this.filteredData, page);

		return viewData;

	}

	// Updating sort with the key and mode of sort
	updateSort (sortKey) {
		const {
			sort
		} = this.state;
		const {
			mode,
			key
		} = sort;

		// Ascending is '' or 'asc' else, 'desc
		const newMode = sortKey === key ? swapMode(mode) : '';
		const newSort = {
			key: sortKey,
			mode: newMode
		};

		this.setState({
			sort: newSort
		});
	}

	// Updating filters with the keys and value of the sort
	updateFilters (val) {
		const {
			filter
		} = this.state;

		// Setting the new set of filters
		const newFilter = {
			keys: filter.keys,
			value: val
		};

		this.setState({
			filter: newFilter
		});

	}

	// Changing the current page
	changePage (type) {
		const {
			page
		} = this.state;
		const {
			size,
			visibilityPointer
		} = page;

		const numOfPages = Math.ceil(this.filteredData.length / size);

		let newVisPtr;

		switch (type) {
		case 'Previous':
			newVisPtr = Math.max(0, visibilityPointer - 1);
			break;
		case 'Next':
			newVisPtr = Math.min(visibilityPointer + 1, numOfPages - 1);
			break;
		case 'Go To Last Page':
			newVisPtr = numOfPages - 1;
			break;
		default :
			newVisPtr = 0;
		}
		const newPage = {
			size,
			visibilityPointer: newVisPtr
		};

		this.setState({
			page: newPage
		});

	}

	render () {
		const {
			headers,
			events,
			classPrefix
		} = this.props;

		const data = this.getRenderData();

		const settings = this.state;

		const actualEvents = this.constructor.getEvents(events);

		const footer = settings.showFooter ? 	<TableFooter
			events = {actualEvents.footer}
			changePage = {this.changePage.bind(this)}
			dataLength = {this.filteredData.length}
			headers = {headers}
			settings = {settings}
			classPrefix={classPrefix}></TableFooter> : null;

		return (
			<table
			 className = {`table-component ${classPrefix}-table`}>

				<TableHeader
					events = {actualEvents.headers}
					updateSort = {this.updateSort.bind(this)}
					updateFilters = {this.updateFilters.bind(this)}
					data = {headers}
					settings = {settings}
					classPrefix={classPrefix}></TableHeader>

				<TableBody
					events = {actualEvents.body}
					data = {data}
					headers = {headers}
					settings = {settings}
					classPrefix={classPrefix}></TableBody>

				{footer}
			</table>
		);
	}
}

export default TableCreator;