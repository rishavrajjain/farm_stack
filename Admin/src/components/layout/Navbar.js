import React,{ useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css'













const Navbar = (props) => {

    
    

    

    
    

    


    
    

    

   

    

      

    

    var privateRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Farm Stack</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                   
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/dashboard"><i className="icon" style={{marginRight:'5px'}} className="fa fa-bar-chart"></i>Dashboard</Link></li>
                    
                   
                    
                    
                    
                    
                    
                    
                    
                    
                </ul>
                
            </div>
           
        </div>
    </nav>
    )
    return privateRoutes;
}

export default Navbar;