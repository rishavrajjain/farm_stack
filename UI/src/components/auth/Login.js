import React,{useState} from 'react';
import './auth.css'
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';



export default function Login(props) {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [loading,setLoading]=useState(false);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const submit = async (e)=>{
    e.preventDefault();

    const {email,password}=user;

    try{
      if(email === '' || password === ''){
        toast.error('Email and Password cannot be empty', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setLoading(true);
  
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/login`,{
        email:email,
        password:password
      })
      localStorage.setItem('auth-token',res.data.data.token);
      localStorage.setItem('name',res.data.data.name);
      localStorage.setItem('email',res.data.data.email);
      
        toast.success('Your accout is setup and logged in successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false);
          props.history.push('/dashboard');
      

     

      
    }catch(err){
      setLoading(false);
      console.log(err);
      if(err.response.status === 403){
        toast.error('Email Verfication Pending :(', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      else if(err.response.status === 401){
        toast.error('Invalid credentials :(', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else{
        toast.error('Something went wrong ! Sorry :(', {
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
            <h1>Account Login</h1>
          </div>
          <div class="form-content">
            <form>
              <div class="form-group"><label for="email">Email</label><input onChange={onChange} type="text" id="email" name="email" required="required" /></div>
              <div class="form-group"><label for="password">Password</label><input onChange={onChange} type="password" id="password" name="password" required="required" /></div>
              
              <div class="form-group"><button onClick={submit}>Log In</button></div>
              
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
