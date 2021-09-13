

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/dashboard/Dashboard';

import ViewResource from './components/dashboard/ViewResource';



function App() {
  return (
    <Router>
    <ToastContainer />

    <Switch>
      
     
      
      <Route exact path="/resources/:id" component={ViewResource}></Route>
      <Route exact path="/" component={Dashboard}></Route>
      
    </Switch>
    
    
    
    </Router>
  );
}

export default App;
