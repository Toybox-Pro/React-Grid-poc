import React, { Component } from 'react';
import './Grid.component.scss';
import { AgGridReact } from 'ag-grid-react';
import CustomDateComponent from './customDateComponent'
import * as moment from 'moment';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router'
import CustomDatePickerComponent from './customDatePickerComponent';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            isMinimized: false,
            columnDefs: [{
                headerName: "Id", field: "guestId", sortable: true, filter: true,
                width: 120, cellClass: 'highlight-id'
            },
            {
                headerName: "City State", field: "cityState", editable: true, sortable: true, filter: true,
                width: 150
            },
            {
                headerName: "Arrival Date", field: "arrDateTime", editable: true, cellEditor: "datePicker", sortable: true,
                filter: "agDateColumnFilter", width: 200, filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var cellDate = new Date(cellValue)
                        if (moment(cellDate).isSame(filterLocalDateAtMidnight)) {
                            return 0;
                        }
                        if (moment(cellDate).isBefore(filterLocalDateAtMidnight)) {
                            return -1;
                        }
                        if (moment(cellDate).isAfter(filterLocalDateAtMidnight)) {
                            return 1;
                        }
                    }
                }
            }, {
                headerName: "Departure Date", field: "depDateTime", editable: true, filter: "agDateColumnFilter", width: 200, sortable: true, filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var cellDate = new Date(cellValue)
                        if (moment(cellDate).isSame(filterLocalDateAtMidnight)) {
                            return 0;
                        }
                        if (moment(cellDate).isBefore(filterLocalDateAtMidnight)) {
                            return -1;
                        }
                        if (moment(cellDate).isAfter(filterLocalDateAtMidnight)) {
                            return 1;
                        }
                    }
                }
            },
            {
                headerName: "Hot Number", field: "hotNum", editable: true, sortable: true, filter: true, width: 150
            },
            {
                headerName: "Accomodation Code", field: "accomCode", editable: true, filter: true
            },
            {
                headerName: "Guest Type", field: "guestType", editable: true, filter: true, width: 140
            },
            {
                headerName: "Name", field: "name", editable: true, filter: true, width: 175
            },
            {
                headerName: "Payment Type", field: "paymentType", editable: true, filter: true,
            },
            {
                headerName: "Posting Status", field: "postingStatus", editable: true, filter: true
            },
            {
                headerName: "Rate Schedule", field: "rateSched", editable: true, filter: true
            },
            {
                headerName: "Reservation Status", field: "resRmStatus", editable: true, filter: true
            },
            {
                headerName: "Room Status", field: "roomStatus", editable: true, filter: true
            },
            {
                headerName: "Status", field: "statusText", editable: true, filter: true
            },
            {
                headerName: "GTD Status", field: "gtdStatus", editable: true, filter: true
            },
            {
                headerName: "Account Balance", field: "acctBalance", editable: true, filter: true
            },
            {
                headerName: "STR Account Balance", field: "strAccBal", editable: true, filter: true
            },
            {
                headerName: "Profile ID", field: "profileID", editable: true, filter: true
            },

            ],
            defaultColDef: { filter: true },
            frameworkComponents: { agDateInput: CustomDateComponent, datePicker: CustomDatePickerComponent }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isMinimized: nextProps.minimize
        })
    }

    componentDidMount() {
        fetch('https://s3.amazonaws.com/cdn.toybox2/Marriott-React-JSON/houselist.json')
            .then(res => res.json())
            .then(rowData => this.setState({ rowData: rowData.guests }))
        document.getElementsByClassName('ag-center-cols-container')[0].setAttribute('id', 'parentColumn');
        document.getElementsByClassName('ag-center-cols-container')[0].addEventListener('click', this.goToCases.bind(this), true)
    }

    gridOnReady = params => {
        this.gridApi = params.api;
    }

    isPopup = () => {
        return true;
    }

    goToCases(event) {
        if (event.target.id !== 'parentColumn' && event.target.classList.contains('highlight-id')) {
            this.props.history.push(`/cases/${event.target.innerHTML}`)
        }
    }

    render() {
        return (
            <div className={`ag-theme-balham custom-grid ${this.state.isMinimized}`} >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    components={this.state.components}
                    floatingFilter={true}
                    rowData={this.state.rowData}
                    frameworkComponents={this.state.frameworkComponents}
                    onGridReady={this.gridOnReady}>
                </AgGridReact>
            </div>
        )
    }
}

Grid = withRouter(Grid);
export default Grid;