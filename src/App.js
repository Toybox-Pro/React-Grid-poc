import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home Component/Home.component';
import { Cases } from './components/Cases Component/Cases.component';
import Logo from './logo.png';
import GridContext from './context';
// import { OAuth2 } from "fetch-mw-oauth2";

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

  // componentDidMount() {
  //   const auth = new OAuth2({

  //   });

  //   const response = await auth.fetch('https://poc-pov-playground-dev-ed.my.salesforce.com/services/apexrest/getCases/851308', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   console.log(response)
  //   const obj = {
  //     grantType: 'password',
  //     clientId: '3MVG9G9pzCUSkzZu0iNkVK0Xdxr9mGsfs7sNZbVaEf3uh0AByvloQSMBebzzX32rZpuESJ_SeU2.JvVFOS_f.',
  //     clientSecret: 'D0F6FDE6C71A18895DFEF232AD87143A353AA73978C65F3A0CBB7AC16405771B',
  //     userName: 'ayan.hore@pocplayground.com',
  //     password: 'ayan@1986@horeqUR3SwNrqGOFdc9k80r7ki3j',
  //     tokenEndPoint: 'https://poc-pov-playground-dev-ed.my.salesforce.com/services/oauth2/token'
  //   };
  //   fetch('https://poc-pov-playground-dev-ed.my.salesforce.com', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     body: JSON.stringify(obj)
  //   })
  //     .then((res) => console.log(res))
  //   fetch('https://poc-pov-playground-dev-ed.my.salesforce.com/services/oauth2/token',

  //     {

  //       method: 'post',

  //       mode: 'no-cors',

  //       body: `grant_type=password&client_id='3MVG9G9pzCUSkzZu0iNkVK0Xdxr9mGsfs7sNZbVaEf3uh0AByvloQSMBebzzX32rZpuESJ_SeU2.JvVFOS_f.'&client_secret='D0F6FDE6C71A18895DFEF232AD87143A353AA73978C65F3A0CBB7AC16405771B'&username=ayan.hore@pocplayground.com'+'&password=ayan@1986@hore'+'qUR3SwNrqGOFdc9k80r7ki3j`

  //     })

  //     .then((res) => JSON.parse(res.json()))
  //     .then(data => console.log(data))
  // }
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
