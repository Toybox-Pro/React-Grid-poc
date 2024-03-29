import React, { Component } from 'react';
import flatpickr from "flatpickr";
import "react-datepicker/dist/react-datepicker.css";

export default class CustomDateComponent extends Component {

    constructor(props) {
        super(props);
        this.datePicker = React.createRef();
        this.state = {
            date: null
        }
    }

    render() {
        //Inlining styles to make simpler the component
        return (
            <div className="ag-input-wrapper custom-date-filter" role="presentation" ref={this.datePicker}>
                <input type='text' data-input onClick={this.enablePicker} />
                <a className='input-button' title='clear' href="# " data-clear>
                    <i className='fa fa-times'></i>
                </a>
            </div>
            // <div className="filterDate ag-custom-component-popup">
            //     <DatePicker selected= {this.state.date} />
            //     {/* <input type="date" value={this.state.date} /> */}
            // </div>
        );
    }

    componentDidMount() {
        this.picker = flatpickr(this.datePicker.current, {
            onChange: this.onDateChanged.bind(this),
            dateFormat: 'm/d/Y',
            wrap: true,
            disableMobile: true,
        });
        this.picker.calendarContainer.classList.add('ag-custom-component-popup');
    }

    //*********************************************************************************
    //          METHODS REQUIRED BY AG-GRID
    //*********************************************************************************

    getDate() {
        //ag-grid will call us here when in need to check what the current date value is hold by this
        //component.
        return this.state.date;
    }

    setDate(date) {
        //ag-grid will call us here when it needs this component to update the date that it holds.
        this.setState({ date })
    }

    //*********************************************************************************
    //          LINKS THE INTERNAL STATE AND AG-GRID
    //*********************************************************************************

    updateAndNotifyAgGrid(date) {
        this.setState({
            date
        },
            //Callback after the state is set. This is where we tell ag-grid that the date has changed so
            //it will proceed with the filtering and we can then expect ag-Grid to call us back to getDate
            this.props.onDateChanged
        );
    }


    //*********************************************************************************
    //          LINKING THE UI, THE STATE AND AG-GRID
    //*********************************************************************************

    onDateChanged = (selectedDates) => {
        this.setState({ date: selectedDates[0] });
        this.updateAndNotifyAgGrid(selectedDates[0])
    }
}