import React, { Fragment } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from './Components/Layout/Navbar'
import Landing from './Components/Layout/Landing'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import './App.css';

const App = () => 
<Router>
    <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </switch>
      </section>
    </Fragment>
</Router>


export default App;
