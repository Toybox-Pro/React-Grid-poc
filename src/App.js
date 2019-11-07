import React, { Component } from 'react';
import './App.scss';
import { Grid } from './components/Grid.component';
import Logo from './grid-icon.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    }
  }

  handleChange(e) {
    console.log(e.target.value)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      submitted: true
    })
  }
  render() {
    return (
      <React.Fragment>
        <header style={{ height: '75px', background: '#fff',boxShadow: '0 3px 6px rgba(0,0,0, 0.5)' }} className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img src={Logo} style={{ height: '50px' }} />
            <span>React Grid POC</span>
          </div>
          <ul className="d-flex nav align-items-center">
            <li className="nav-item px-4">Home</li>
            <li className="nav-item px-4">About Us</li>
            <li className="nav-item px-4">Contact</li>
            <li className="nav-item px-4">Hotels</li>
          </ul>
        </header>
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
                      <label style={{color: '#444054'}} htmlFor="city" >City</label>
                      <input autoComplete="off" id="city" className="form-control" onChange={($event) => this.handleChange($event)} />
                    </div>
                    <div className="form-group col-3 mx-3">
                      <label style={{color: '#444054'}} htmlFor="guestId">Guest Id</label>
                      <input autoComplete="off" id="guestId" className="form-control" onChange={($event) => this.handleChange($event)} />
                    </div>
                    <div className="form-group col-3 ml-3">
                      <label style={{color: '#444054'}} htmlFor="acc">Accomodation Code</label>
                      <input autoComplete="off" id="acc" className="form-control" onChange={($event) => this.handleChange($event)} />
                    </div>
                    <div className="form-group col-2 d-flex align-items-end justify-content-center">
                      <button className="btn col-10 search" style={{background: '#ff9662', color: '#fff', fontWeight: 'bold', borderRadius: 0}} onClick={($event) => this.handleClick($event)}>Search</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {
            (this.state.submitted) ? (<Grid></Grid>) : ''
          }
        </div>
      </React.Fragment >
    );
  }
}

export default App;
