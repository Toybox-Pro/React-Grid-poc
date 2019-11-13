import React, { Component } from 'react';
import Grid from './Grid.component';
import './Home.component.scss';
import GridContext from "./../../context";
import Minimise from './../../minimise.svg';
import Maximise from './../../maximise.svg';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            guestId: '',
            accCode: '',
            minimize: false,
            clicked: 0
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
        this.context.changeGridState(this.state.city, this.state.guestId, this.state.accCode, this.state.departureDate, this.state.arrivalDate, this.state.hotNumber);
        this.setState({
            clicked: this.state.clicked + 1
        })
    }
    componentDidMount() {
        this.setState({
            city: this.context.city,
            guestId: this.context.guestId,
            accCode: this.context.accCode,
            departureDate: this.context.departureDate,
            arrivalDate: this.context.arrivalDate,
            hotNumber: this.context.hotNumber
        })
    }
    handleMinimize = () => {
        this.setState({
            minimize: !this.state.minimize
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className={`card my-4 default ${this.state.minimize}`} style={{ border: 'none', boxShadow: '0 6px 12px rgba(0,0,0, 0.5)' }}>
                                <div className={`card-title p-3 d-flex align-items-center justify-content-between`}>
                                    <h4 className="ml-2">Search Reservations</h4>
                                    <div className="d-inline-flex" onClick={() => this.handleMinimize()}>
                                        {
                                            (this.state.minimize) ? <img src={Maximise} alt="Maximise" style={{ width: '30px', height: '30px', cursor: 'pointer' }} /> : <img src={Minimise} alt="Minimise" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                                        }
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form className="form-row justify-content-center">
                                        <div className="form-group col-3 mx-3 mb-4">
                                            <label style={{ color: '#444054' }} htmlFor="city" >City</label>
                                            <input type="text" value={this.state.city} autoComplete="off" id="city" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 mx-3 mb-4">
                                            <label style={{ color: '#444054' }} htmlFor="guestId">Guest Id</label>
                                            <input type="text" value={this.state.guestId} autoComplete="off" id="guestId" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 ml-3 mb-4">
                                            <label style={{ color: '#444054' }} htmlFor="accCode">Accomodation Code</label>
                                            <input type="text" value={this.state.accCode} autoComplete="off" id="accCode" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 mx-3 mt-3">
                                            <label style={{ color: '#444054' }} htmlFor="hotNumber" >Hot Number</label>
                                            <input type="text" value={this.state.hotNumber} autoComplete="off" id="hotNumber" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 mx-3 mt-3">
                                            <label style={{ color: '#444054' }} htmlFor="departureDate">Departure Date</label>
                                            <input type="date" value={this.state.departureDate} autoComplete="off" id="departureDate" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 ml-3 mt-3">
                                            <label style={{ color: '#444054' }} htmlFor="arrivalDate">Arrival Date</label>
                                            <input type="date" value={this.state.arrivalDate} autoComplete="off" id="arrivalDate" className="form-control" onChange={($event) => this.handleChange($event)} />
                                        </div>
                                        <div className="form-group col-3 offset-8 mt-3 d-flex align-items-end justify-content-end">
                                            <button className="btn col-12 col-xl-8 search" style={{ background: '#ff9662', color: '#fff', fontWeight: 'bold', borderRadius: 0 }} onClick={($event) => this.handleClick($event)}>Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            {
                                (this.context.gridState) ? (<Grid minimize={this.state.minimize} clicked={this.state.clicked}></Grid>) : ''
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}