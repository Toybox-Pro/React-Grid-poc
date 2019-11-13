import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home Component/Home.component';
import { Cases } from './components/Cases Component/Cases.component';
import Logo from './logo.png';
import GridContext from './context';

class App extends Component {

  constructor() {
    super();
    this.state = {
      gridState: false,
      city: '',
      guestId: '',
      accCode: '',
      departureDate: '',
      arrivalDate: '',
      hotNumber: ''
    }
    this.changeGridState = this.changeGridState.bind(this);
  }

  changeGridState(city, guestId, accCode, departureDate, arrivalDate, hotNumber) {
    this.setState({
      gridState: true,
      city,
      guestId,
      accCode,
      hotNumber,
      arrivalDate,
      departureDate
    })
  }
  render() {

    return (
      <React.Fragment>
        <header style={{ height: '75px', background: '#fff', boxShadow: '0 3px 6px rgba(0,0,0, 0.5)' }} className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img src={Logo} alt="logo" style={{ height: '75px', width: 'auto' }} />
            <span>Marriott</span>
          </div>
          {/* <ul className="d-flex nav align-items-center">
            <li className="nav-item px-4">Home</li>
            <li className="nav-item px-4">About Us</li>
            <li className="nav-item px-4">Contact</li>
            <li className="nav-item px-4">Hotels</li>
          </ul> */}
        </header>
        <GridContext.Provider value={{
          gridState: this.state.gridState, changeGridState: this.changeGridState, city: this.state.city, guestId: this.state.guestId, accCode: this.state.accCode, departureDate: this.state.departureDate, arrivalDate: this.state.arrivalDate, hotNumber: this.state.hotNumber
        }}>
          <Router>
            <Switch>
              <Route path="/" exact={true} component={Home}>
              </Route>
              <Route path="/cases/:id" component={Cases}>
              </Route>
            </Switch>
          </Router>
        </GridContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
