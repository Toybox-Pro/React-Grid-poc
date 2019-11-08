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
            minimize: false
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
    handleMinimize = () => {
        this.setState({
            minimize: !this.state.minimize
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={`card my-5 default ${this.state.minimize}`} style={{ border: 'none', boxShadow: '0 6px 12px rgba(0,0,0, 0.5)' }}>
                                <div className={`card-title p-3 d-flex align-items-center justify-content-between`}>
                                    <h4>Search Reservations</h4>
                                    <div className="d-inline-flex" onClick={() => this.handleMinimize()}>
                                        {
                                            (this.state.minimize) ? <img src={Maximise} alt="Maximise" style={{ width: '30px', height: '30px', cursor: 'pointer' }} /> : <img src={Minimise} alt="Minimise" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                                        }
                                    </div>
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
                        (this.context.gridState) ? (<Grid minimize={this.state.minimize}></Grid>) : ''
                    }
                </div>
            </React.Fragment >
        )
    }
}