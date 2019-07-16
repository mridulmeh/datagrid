import React from 'react';
import TableRow from './table-row';

class TableBody extends React.Component {

	render () {
		const {
			headers,
			classPrefix,
			data,
			events
		} = this.props;
		const {
			tbody
		} = events;

		const rowHtml = data.map((rowData, i) => (
			<TableRow
				events = {events}
				data = {rowData}
				headers = {headers}
				type = {'body'}
				classPrefix = {classPrefix}
				key = {i}>
			</TableRow>
		));

		return (
			<tbody className ={`table-component-tbody ${classPrefix}-tbody`} {...tbody}>
				{rowHtml}
			</tbody>
		);
	}
}

export default TableBody;