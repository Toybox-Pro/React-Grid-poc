import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';

export default class CustomDatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.customDatePicker = React.createRef();
        this.state = {
            date: new Date(props.value)
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            date: e
        })
    }
    
    getValue() {
        return moment(this.state.date).format('MM/DD/YYYY');
    }
    render() {
        return (
            <div className="custom-container">
                <DatePicker selected={this.state.date} onChange={($event) => this.onChangeHandler($event)} id="date-jumper" ref={(customDatePicker) => {customDatePicker = this.customDatePicker}} />
            </div>
        )
    }
}