import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import './dashboard.css';

export default function InvoiceList(props) {
    const [isLoading,setIsLoading]=useState(true);
    const [resources,setResources]=useState([])

    useEffect(()=>{
        
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/resources`).then(res=>{
            console.log(res);
            setResources(res.data.data)
            setIsLoading(false);
        }).catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
    },[])

    
    return isLoading?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <div>
        <Navbar/>
            
<div class="container table-responsive py-5" style={{marginTop:'4rem'}}> 
<div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      
      <a className="btn btn-dark" style={{marginBottom:'2rem',marginLeft:'1rem'}} target="_blank" href="https://map-farm-stack.netlify.app/"><i className="fa fa-globe"></i>{'  '}Map</a>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      
      
      </div>
</div>
<div class="section-title" data-aos="fade-up">
                <p></p>
              </div>

<table class="table table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Status</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {
      resources.map((resource,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{resource.title}</td>
                <td>{resource.status}</td>
               
                <td><Link className="btn btn-block btn-dark" to={`/resources/${resource._id}`} data-toggle="modal" data-target="#exampleModalCenter">View</Link></td>
            </tr>
        )
      })
  }
    
    
  </tbody>
</table>
</div>



        </div>)
}
