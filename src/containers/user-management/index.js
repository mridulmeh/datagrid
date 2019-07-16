import React from 'react';
import { TableCreator } from '../../components';
import { dataLoader } from '../../utils';
import { prepareHeaderData } from './helper';
import './user-manager.css';

class UserManagement extends React.Component {
	constructor () {
		super(); 
		this.data = [];
		this.state = {
			detail: {
				show: false,
				dataset: null
			},
			dataPresent: false
		};
	}

	// Loading the data from a fetch request
	loadData (){

		return dataLoader().then(res => {

			res.json().then((data) => {
				this.data = data.users;
				this.setState({
					dataPresent: true
				});

			});
		});

	}

	componentDidMount () {
		this.loadData();
	}

	// Setting the state to show details
	showDetail (data) {

		this.setState({
			detail: {
				show: true,
				dataset: data
			}
		});
	}

	// Setting the state to hide details
	hideDetail () {
		this.setState({
			detail: {
				show: false,
				dataset: null
			}
		});
		this.loadData();
	}

	render () {

		const {
			dataPresent
		} = this.state;

		let UserManagementHTML = (<div>{'No Data Present'}</div>);

		if(dataPresent){
			const data = this.data;

			const headers = prepareHeaderData(data);

			const settings = {
				filter: {
					keys: ['id'],
					value: ''
				},
				showFooter: true
			};
			const self = this;

			const events = {
				body: {
					tr: {
						onClick: function (e) {
							self.showDetail(this.props.data);
						}
					}
				}
			};

			UserManagementHTML = (
				<div>
					<TableCreator
						data = {data}
						headers = {headers}
						settings = {settings}
						events = {events}
						classPrefix = {'user-manager'}></TableCreator>

				</div>)
			;
		}
		return (
			<div className = "user-manager">
				{ UserManagementHTML }
			</div>
		);
	}
}

export default UserManagement;