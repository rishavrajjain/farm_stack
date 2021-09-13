import React, { useEffect,useState } from 'react';
import './auth.css'
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';

import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';






export default function Signup(props) {

  
  const [value, setValue] = useState();
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
    cnfpassword:'',

  });

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const [loading,setLoading]=useState(false);

  const submit = async(e)=>{
    e.preventDefault();
    const {email,password,cnfpassword,name}=user;

    try{

      
      if(email === '' || password === '' ||  cnfpassword ===''  || name === ''){
        toast.error('All fields are required.Please fill all', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return;
      }

      if(password !== cnfpassword){
        toast.error('Passwords do not match', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return;
      }

      const data = {
        email:email,
        password:password,
        name:name,
      }
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/createuser`,data);
      toast.success(' 🚀 Signup Successfull', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        localStorage.setItem('auth-token',res.data.data.token);
      localStorage.setItem('name',res.data.data.name);
      localStorage.setItem('email',res.data.data.email);
        setLoading(false);
        props.history.push('/dashboard')
        
    }catch(err){
      setLoading(false);
      if(err.response.status == 409){
        toast.error('User already exists.Please login', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          
      }else{
        toast.error('Something went wrong.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    
  }
  
    return (
      <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
        <div >
        <Navbar/>
        <section id="login-page">
        
        
        
        <div className="container login-page" >
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Account Signup</h1>
          </div>
          <div class="form-content">
            <form onSubmit={submit}>
            <div class="form-group"><label for="name">Name</label><input onChange={onChange} type="text" id="name" name="name" required="required" /></div>
              <div class="form-group"><label for="email">Email</label><input onChange={onChange} type="text" id="email" name="email" required="required" /></div>
              <div class="form-group"><label for="password">Password</label><input onChange={onChange} type="password" id="password" name="password" required="required" /></div>
              <div class="form-group"><label for="password">Confirm Password</label><input onChange={onChange} type="password" id="password" name="cnfpassword" required="required" /></div>
              
              
              

              
                
                
                
                

                
              
              
              
              
              
              
              
              
              
              <div class="form-group"><button type="submit" >Sign up</button></div>
            </form>
          </div>
        </div>
        <div class="form-panel two">
          
        </div>
        </div>
        
      </div>
        
       
        
        </div>
        </section>
        </div>
        </LoadingOverlay>
    )
}
