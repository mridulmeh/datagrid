import React from 'react';
import TableCell from './table-cell';

class TableRow extends React.Component {

	render () {
		const {
			headers,
			classPrefix,
			data,
			events,
			type
		} = this.props;
		const {
			tr
		} = events;

		const newEventObj = {};

		const bodyHtml = (rowData) => headers[headers.length - 1].map(header => (
			<TableCell
				classPrefix = {classPrefix}
				data = {rowData}
				header = {header}
				events = {events}
				type = {type}
				key = {header.key}>{rowData[header.key]}
			</TableCell>
		));

		Object.keys(tr).forEach(key => {
			newEventObj[key] = tr[key].bind(this);
		});

		return (
			<tr className ={`table-component-tr ${classPrefix}-tr`} {...newEventObj}>
				{bodyHtml(data)}
			</tr>
		);
	}
}

export default TableRow;