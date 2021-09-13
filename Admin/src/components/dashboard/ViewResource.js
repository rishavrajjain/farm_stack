import axios from 'axios';
import React,{useEffect, useState} from 'react'
import './dashboard.css'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import Navbar from '../layout/Navbar';

export default function ViewResource(props) {

    const id = props.match.params.id;

    const [content,setContent]=useState("");
    const [contentTitle,setContentTitle]=useState("");
    const [status,setStatus]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [loading,setLoading]=useState(false);

    const [reviewContent,setReviewContent]=useState("");
    const [reviewContentTitle,setReviewContentTitle]=useState("");
    

    

    

    

    

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/resource/${id}`).then((res)=>{
            setContent(res.data.data.content);
            setStatus(res.data.data.status);
            setContentTitle(res.data.data.title);
            setIsLoading(false);
        }).catch(err=>{
            toast.error('Something went wrong.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setIsLoading(false);
        })
    },[])

    const submitReview = async()=>{
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/resource/complete/${id}`,{
            title:reviewContentTitle,
            content:reviewContent
        }).then((res)=>{
            
            toast.success('🦄 Resource Reviewed Successfully !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.history.push('/dashboard');
        }).catch(err=>{
            console.log(err);
            toast.error('Something went wrong !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
    return isLoading ?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
            <Navbar/>
            <div className="container" style={{marginTop:'5rem'}}>
                <div className="row">
                    <div className="col">
                    <table class="table table-bordered table-hover">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    
                       
                         
                              <tr>
                                  <th scope="row">{1}</th>
                                  <td>{contentTitle}</td>
                                  <td>{status}</td>
                                 
                                  
                              </tr>
                          
                    
                      
                      
                    </tbody>
                  </table>
                    
                    </div>
                    
                
                </div>
                <div className="row">
                    <div className="col" dangerouslySetInnerHTML={{ __html: content }}>
                        
                    
                    </div>
                    
                
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                    <form >
                        <div className="form-group">
                            <label>Review Title</label>
                            <input className="form-control" type="text" name="reviewText" placeholder="Review Title" onChange={(e)=>setReviewContentTitle(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Review Content</label>
                            <textarea className="form-control" rows="10" name="reviewContent" placeholder="Review Content" onChange={(e)=>setReviewContent(e.target.value)}></textarea>
                        </div>
                        <button className="btn btn-success btn-block" style={{marginBottom:'2rem'}} onClick={submitReview}>Complete Review</button>
                    </form>
                    
                    
                    </div>
                
                </div>
            
            
            
            </div>
            

        </LoadingOverlay>
    )
}
