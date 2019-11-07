import React, { Component } from 'react';
import './Cases.component.scss';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import Back from './../../back.svg';

export class Cases extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDefs: [{
                headerName: "Case Number", field: "caseNumber", editable: true, sortable: true, filter: true,
                width: 150
            },
            {
                headerName: "Reservation ID", field: "reservationID", editable: true, sortable: true, filter: true,
                width: 160
            },
            {
                headerName: "Created By", field: "createdBy", editable: true, sortable: true, filter: true,
                width: 140
            },
            {
                headerName: "Location", field: "location", editable: true, sortable: true, filter: true,
                width: 120
            }, {
                headerName: "Case Sub Type", field: "caseSubtype", editable: true, sortable: true, filter: true,
                width: 160
            }, {
                headerName: "Date Time", field: "dateTime", editable: true, sortable: true, filter: true,
                width: 120
            },
            {
                headerName: "Case Priority", field: "casePriority", editable: true, sortable: true, filter: true,
                width: 150
            }, {
                headerName: "Status", field: "status", editable: true, sortable: true, filter: true,
                width: 120
            }, {
                headerName: "Description", field: "description", editable: true, sortable: true, filter: true,
                width: 150
            }, {
                headerName: "Case Origin", field: "caseOrigin", editable: true, sortable: true, filter: true,
                width: 140
            }, {
                headerName: "Marsha Code", field: "marshaCode", editable: true, sortable: true, filter: true,
                width: 150
            }],
            defaultColDef: { filter: true },
        }
    }

    gridOnReady = params => {
        this.gridApi = params.api;
    }

    componentDidMount() {
        fetch('https://s3.amazonaws.com/cdn.toybox2/Marriott-React-JSON/cases.json')
            .then(res => res.json())
            .then(cases => {
                this.setState({ cases: cases.filter(e => e.reservationID === this.props.match.params.id) });
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 my-5">
                        <span>
                            <Link to="/">
                                <img src={Back} alt="back" style={{ width: '20px', verticalAlign: 'text-bottom' }} />
                                &nbsp;Back To Reservations
                            </Link>

                        </span>
                        <div
                            className="ag-theme-balham mt-3"
                            style={{
                                height: '500px'
                            }}
                        >
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                floatingFilter={true}
                                rowData={this.state.cases}
                                onGridReady={this.gridOnReady}>
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}