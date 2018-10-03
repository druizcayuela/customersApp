import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {

  renderHome = () => <HomeContainer />;
  renderCustomerContainer = () => <h1>Customer Container</h1>;
  renderCustomerListContainer = () => <CustomersContainer></CustomersContainer>;
  

  render() {
    return (
      <Router>
        <div>
         <Route exact path="/" component={this.renderHome} />
         <Route exact path="/customers" component={this.renderCustomerListContainer} />
         <Switch>
            <Route path="/customers/new" component={NewCustomerContainer} />
            <Route path="/customers/:dni" 
                   render={props => <CustomerContainer dni={props.match.params.dni} />} />
         </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
