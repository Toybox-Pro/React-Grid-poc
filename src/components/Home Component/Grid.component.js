import React, { Component } from 'react';
import './Grid.component.scss';
import { AgGridReact } from 'ag-grid-react';
import CustomDateComponent from './customDateComponent'
import * as moment from 'moment';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router'
import CustomDatePickerComponent from './customDatePickerComponent';
import GridContext from "./../../context";

class Grid extends Component {
    static contextType = GridContext;
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
                headerName: "Departure Date", field: "depDateTime", editable: true, cellEditor: "datePicker", filter: "agDateColumnFilter", width: 200, sortable: true, filterParams: {
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
        if (nextProps.clicked > this.props.clicked) {
            let url;
            setTimeout(() => {
                url = this.createUrl();
                this.getData(url);
            }, 100);
        }
    }

    componentDidMount() {
        let url;
        setTimeout(() => {
            url = this.createUrl();
            this.getData(url);
        }, 100);
        document.getElementsByClassName('ag-center-cols-container')[0].setAttribute('id', 'parentColumn');
        document.getElementsByClassName('ag-center-cols-container')[0].addEventListener('click', this.goToCases.bind(this), true);

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

    handleChange = params => {
        if ((params.oldValue !== params.newValue) && params.oldValue) {
            //call the api here
            console.log(params);
            this.updateData(params.data);
        }
    }

    activateDate(e) {
        e.target.click();
    }

    getData(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15Iiwicm9sZSI6InBvYyIsImlhdCI6MTUxNjIzOTAyMn0.0pZkdaT9ACzIIq-8CWi6P1d-9PX4CDZ1kS69uAEd4bs',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json())
            .then(rowData => {
                if (Array.isArray(rowData)) {
                    this.setState({ rowData })
                } else {
                    this.setState({ rowData: [] })
                }
            })
            .catch(err => console.log(err));
    }
    createUrl() {
        let url = '';
        if (!this.context.city && !this.context.guestId && !this.context.accCode && !this.context.departureDate && !this.context.arrivalDate && !this.context.hotNumber) {
            url = 'http://ec2-54-204-237-108.compute-1.amazonaws.com:8080/dummy';
        } else {
            url = `http://ec2-54-204-237-108.compute-1.amazonaws.com:8080/dummy/Search/?dummyId=${this.context.guestId}&cityState=${this.context.city}&Acccode=${this.context.accCode}&HotNumber=${this.context.hotNumber}&DepartDate=${moment(this.context.departureDate).format('MM/DD/YYYY')}&ArrivalDate=${moment(this.context.arrivalDate).format('MM/DD/YYYY')}`
        }
        return url;
    }

    updateData(data) {
        fetch('http://ec2-54-204-237-108.compute-1.amazonaws.com:8080/dummy', {
            method: 'PUT',
            headers: {
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15Iiwicm9sZSI6InBvYyIsImlhdCI6MTUxNjIzOTAyMn0.0pZkdaT9ACzIIq-8CWi6P1d-9PX4CDZ1kS69uAEd4bs',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
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
                    onGridReady={this.gridOnReady}
                    onCellValueChanged={this.handleChange}
                    enableCellChangeFlash={true}>
                </AgGridReact>
            </div>
        )
    }
}

Grid = withRouter(Grid);
export default Grid;