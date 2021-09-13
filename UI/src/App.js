

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateResource from './components/dashboard/CreateResource';
import ViewResource from './components/dashboard/ViewResource';
import Account from './components/auth/Account';
import Home from './components/home/Home';


function App() {
  return (
    <Router>
    <ToastContainer />

    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      
      <PrivateRoute exact path="/resources/:id" component={ViewResource}></PrivateRoute>
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/resource/add" component={CreateResource}></PrivateRoute>
      <PrivateRoute exact path="/account" component={Account}></PrivateRoute>
    </Switch>
    
    
    
    </Router>
  );
}

export default App;
