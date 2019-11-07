import React, { Component } from 'react';
import Grid from './Grid.component';
import './Home.component.scss';
import GridContext from "./../../context";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            guestId: '',
            accCode: ''
        }
    }
    static contextType = GridContext;
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();
        this.context.changeGridState(this.state.city, this.state.guestId, this.state.accCode);
    }
    componentDidMount() {
        this.setState({
            city: this.context.city,
            guestId: this.context.guestId,
            accCode: this.context.accCode
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-5" style={{ border: 'none', boxShadow: '0 6px 12px rgba(0,0,0, 0.5)' }}>
                                <div className="card-title p-3">
                                    <h4>Search Reservations</h4>
                                </div>
                                <div className="card-body">
                                    <form className="form-row">
                                        <div className="form-group col-3 mx-3">
                                            <label style={{ color: '#444054' }} htmlFor="city" >City</label>
                                            <input value={this.state.city} autoComplete="off" id="city" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 mx-3">
                                            <label style={{ color: '#444054' }} htmlFor="guestId">Guest Id</label>
                                            <input value={this.state.guestId} autoComplete="off" id="guestId" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 ml-3">
                                            <label style={{ color: '#444054' }} htmlFor="accCode">Accomodation Code</label>
                                            <input value={this.state.accCode} autoComplete="off" id="accCode" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-2 d-flex align-items-end justify-content-center">
                                            <button className="btn col-10 search" style={{ background: '#ff9662', color: '#fff', fontWeight: 'bold', borderRadius: 0 }} onClick={($event) => this.handleClick($event)}>Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (this.context.gridState) ? (<Grid></Grid>) : ''
                    }
                </div>
            </React.Fragment >
        )
    }
}