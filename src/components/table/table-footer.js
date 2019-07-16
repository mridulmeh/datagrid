import React from 'react';
import rightArrow from '../../images/right-arrow.png';
import fastForward from '../../images/fast-forward.png';

const leftArrowTitles = [
	'Go to First Page',
	'Previous'
];
const arrows = [rightArrow, fastForward];
const rightArrowTitles = [
	'Next',
	'Go To Last Page'
];

class TableFooter extends React.Component {

	render () {
		const {
			classPrefix,
			headers,
			settings,
			changePage,
			dataLength
		} = this.props;
		const {
			page
		} = settings;
		const {
			size,
			visibilityPointer
		} = page;

		const numOfPages = Math.ceil(dataLength / size);

		const imageTagGen = (titles, isReverse) => titles.map((title, index) => (
			<span key = {title}>
				<img
					onClick = {() => changePage(title)}
					className = {`table-component-arrow arrow-${isReverse ? 'left' : 'right'}`}
					src = {arrows[isReverse ? (1 - index) : index]}
					alt = {title}
					title = {title}></img>
			</span>
		));

		return (
			<tfoot className ={`table-component-tfoot ${classPrefix}-tfoot`}>

				<tr>
					<td colSpan = {headers[headers.length - 1].length}>
						{imageTagGen(leftArrowTitles, true)}
						<span>{`Page ${visibilityPointer + 1} of ${numOfPages}`}</span>
						{imageTagGen(rightArrowTitles, false)}
					</td>
				</tr>
			</tfoot>
		);
	}
}

export default TableFooter;