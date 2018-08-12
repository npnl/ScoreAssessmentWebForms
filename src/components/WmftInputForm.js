// WmftInputForm.js
import React from 'react';
import WmftFormRow from './WmftFormRow'
import DownloadCSV from './DownloadCSV'

class WmftInputForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {rows: props.data}
		this.getCSVData = this.getCSVData.bind(this);
		this.scoreChanged = this.scoreChanged.bind(this);
		this.timeChanged = this.timeChanged.bind(this);
		this.subjectChanged = this.subjectChanged.bind(this);
		this.dateChanged = this.dateChanged.bind(this);
	}

	subjectChanged(event) {
		this.setState({subID: event.target.value});
	}

	dateChanged(event) {
		this.setState({date: event.target.value});
	}

	scoreChanged(item_no, value) {
		var base_index = this.state.rows[0]['item_no'];
		item_no = item_no - base_index;
		var new_rows = this.state.rows;
		new_rows[item_no-1]['score'] = value
		this.setState({rows: new_rows});
	}

	timeChanged(item_no, value) {
		var base_index = this.state.rows[0]['item_no'];
		item_no = item_no - base_index;
		var new_rows = this.state.rows;
		new_rows[item_no-1]['time'] = value
		this.setState({rows: new_rows});
	}

	getCSVData() {
		var date = this.state.date;
		var date_obj = new Date(date);
		var day = date_obj.getDate() + 1;
		var month = date_obj.getMonth() + 1;
		var year = date_obj.getFullYear();
		var subID = this.state.subID;
		var data = this.state.rows.map(function(item) { 
		var new_item = {
			SubID: subID,
			Date: date,
			Year: year,
			Month: month,
			Day: day,
			Item_no: item.item_no,
			Task: item.task,
			Time: item.time,
			Score: item.score
		};
		return new_item; 
		}, this, subID, day, month, year, date);
		return data;
	}

	render() {
		var rows = [];
		for (var i = 0; i < this.state.rows.length; i++) {
			var data = this.state.rows[i];
		  rows.push(<WmftFormRow data={data} scoreChanged={this.scoreChanged} timeChanged={this.timeChanged}/>);
		}

		return(
			<div className="container" style={{marginTop: 100 + 'px'}}>
				<div className="form-title">
					<h1>Wolf Motor Function Task</h1>
				</div>
				<div className="basic-info">
					<div className="subject_div">
						<label>Subject Id</label>
						<input type="text" className="form-control is-valid" placeholder="Subject Id" value={this.state.subID} onChange={this.subjectChanged} required />
					</div>
					<div className="date_div">
						<label>Date</label>
						<input type="date" className="form-control"  placeholder="Date" min="2010-01-01" max="2099-12-31" onChange={this.dateChanged} required />
					</div>
				</div>

				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Item</th>
							<th>task</th>
							<th>Time</th>
							<th>FAS Score</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<div className="download-btn">
					<DownloadCSV dataHandler={this.getCSVData} filename="wmft.csv"/>
				</div>
			</div>
			);
	}
}

export default WmftInputForm;
