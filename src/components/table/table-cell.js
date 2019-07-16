import React from 'react';

const tagNames = {
	head: 'th',
	body: 'td'
};

class TableCell extends React.Component {

	render () {
		const {
			header,
			classPrefix,
			data,
			events,
			type
		} = this.props;
		const {
			td
		} = events;

		const Tag = tagNames[type];

		return (
			<Tag className ={`table-component-td ${classPrefix}-td`} {...td}>
				{data[header.key]}
			</Tag>
		);
	}
}

export default TableCell;