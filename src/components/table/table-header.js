import React from 'react';
import arrow from '../../images/down-arrow.png';

class TableHeader extends React.Component {
	constructor () {
		super();
		this.state = {
			search: ''
		};
	}

	render () {
		const {
			data,
			classPrefix,
			updateSort,
			settings
		} = this.props;

		const {
			sort
		} = settings;

		const sortImage = (sortMode) => (<img
			src = {arrow}
			alt = {'sort'}
			className = {`table-component-arrow arrow-${sortMode === 'desc' ? 'down' : 'up'}`}>
		</img>);

		const getHeader = (header) => {
			if(header.elem){
				const {
					name,
					styles,
					attr,
					events
				} = header.elem;
				const CustomTag = name;
				const allEvents = {};

				Object.keys(events).forEach(event => {
					allEvents[event] = (e) => {
						events[event](this.props, e.target.value);
					};
				});

				return (
					<CustomTag
						{...attr}
						{...allEvents}
						style = {styles || {}}></CustomTag>
				);
			}
			return header.name;
		};

		const headerHtml = (rowData) => rowData.map(header => (
			<th
				onClick = {() => !header.noSort && updateSort(header.key)}
				className ={`table-component-th ${classPrefix}-th`}
				key = {header.key}
				colSpan = {header.colSpan}>
				<span>
					{getHeader(header)}
				</span>
				{sort.key === header.key ? sortImage(sort.mode) : ''}

			</th>
		));

		const rowHtml = data.map((rowData, i) => (
			<tr className ={`table-component-tr ${classPrefix}-tr`} key = {i}>{ headerHtml(rowData)}</tr>
		));

		return (
			<thead className ={`table-component-thead ${classPrefix}-thead`}>
				{rowHtml}
			</thead>
		);
	}
}

export default TableHeader;