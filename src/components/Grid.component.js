import React, { Component } from 'react';
import './Grid.component.scss';
import { AgGridReact } from 'ag-grid-react';
import CustomDateComponent from './customDateComponent'
import * as moment from 'moment';
import fetch from 'isomorphic-fetch';

const $ = window.$;

export class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Id", field: "guestId", editable: true, sortable: true, filter: true,
                width: 120
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
                headerName: "Accomodation Code", field: "accomCode", editable: true,  filter: true
            },
            {
                headerName: "Guest Type", field: "guestType", editable: true,  filter: true, width: 140
            },
            {
                headerName: "Name", field: "name", editable: true,  filter: true, width: 175
            },   
            {
                headerName: "Payment Type", field: "paymentType", editable: true,  filter: true, 
            },
            {
                headerName: "Posting Status", field: "postingStatus", editable: true, filter: true
            },
            {
                headerName: "Rate Schedule", field: "rateSched", editable: true,  filter: true
            },
            {
                headerName: "Reservation Status", field: "resRmStatus", editable: true,  filter: true
            },
            {
                headerName: "Room Status", field: "roomStatus", editable: true,  filter: true
            },
            {
                headerName: "Status", field: "statusText", editable: true,  filter: true
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
            components: { datePicker: getDatePicker() },
            defaultColDef: { filter: true },
            frameworkComponents: { agDateInput: CustomDateComponent }
        }
    }

    componentDidMount() {
        fetch('https://s3.amazonaws.com/cdn.toybox2/Marriott-React-JSON/houselist.json')
            .then(res => res.json())
            .then(rowData => this.setState({ rowData: rowData.guests }))
    }

    gridOnReady = params => {
        this.gridApi = params.api;
    }

    isPopup = () => {
        return true;
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px'
                }}
            >
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

function getDatePicker() {
    function Datepicker() { }
    Datepicker.prototype.init = function (params) {
        console.log(params)
        this.eInput = document.createElement("input");
        this.eInput.value = params.value;
        $(this.eInput).datepicker();
        console.log(this.eInput)
    };
    Datepicker.prototype.getGui = function () {
        return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
        this.eInput.focus();
        this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
        return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
        return false;
    };
    return Datepicker;
}
