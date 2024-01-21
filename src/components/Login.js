import {useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import {addUser, removeUser} from '../Slices/userSlice'
import {useDispatch} from 'react-redux'
import './LoginCSS.css'
import { Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login(){

    
    let user = useSelector(state=>state.user);

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}} = useForm()

    const onFormSubmit = async(userCredentialsObject)=>{
      let response = await axios.post('https://notescraftserver-shivateja28-ofg3.onrender.com/user-api/login', userCredentialsObject)
      let data = response.data;
      console.log("login", data);
      console.log("USEROBJ: ",)
      alert(data.message)
      if(data.message=="success"){
        let actionobj = addUser(data.userObj)
        await dispatch(actionobj)
        navigate("/home");
      }
      
    }

    function handleCallbackResponse(response){
        console.log("Encoded JWt" , response.credential);
        var userObject = jwtDecode(response.credential);
        console.log("jfd",userObject);
        let actionobj = addUser(userObject)
        dispatch(actionobj)
        if(user.userObj.email!==""){
          navigate("/home");
        }
    }

    useEffect(()=>{
        const google = window.google;
        google.accounts.id.initialize({
        client_id: "526547695439-smn8289mhcd4levb4qqht639efqotje0.apps.googleusercontent.com",
        callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        {theme: "outline", size: "large"}
        )
    })
    
    return(
        <div>
          <form onSubmit={handleSubmit(onFormSubmit)} className ='mx-auto m-5 p-2 pt-5 pb-5 '>

            <p className='h1'>Login</p>
          
            <p className='h3 text-start ms-5 mt-4'>User Email</p>  
            <input type = "text" id = "un" className="w-75 ms-5 form-control" {...register("email", {required: true})} />
            {errors.email?.type === 'required' && <p>*Email Required</p>}

            <p className='h3 text-start ms-5 mt-4'>Password</p>
            <input type = "password" id = "pa" className="w-75 ms-5 form-control" {...register("password", {required: true})} />
            {errors.password?.type === 'required' && <p>*Password Required</p>}

            <div className='text-center mt-2'>
                <Button type = "Submit" className='bg-dark rounded outline-dark text-light p-2 m-3 ms-0 w-25 '>Submit</Button>
            </div>
{/* 
            <div class="divider mx-auto">
              <hr class="left"/>OR<hr class="right"/>
            </div>
            
            <div id = "googleSignIn" className='ms-5 w-100 ps-4'/> */}
          </form>  
        </div>
    );
}

export default Login;