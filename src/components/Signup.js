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


function Signup(){

    
    let userData = useSelector(state=>state.child1a)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}} = useForm()

    const onFormSubmit = async(userData)=>{
        axios.post('https://notescraftserver-shivateja28-ofg3.onrender.com/user-api/create-user', userData)
        .then(response=>{
            if(response.data.message == "New User created"){
                alert(response.data.message)
                navigate('/login');
            }
            else if(response.data.message == "email has already taken..Plz choose another"){
                alert(response.data.message)
            }
            console.log(userData)
            console.log(response.data.message)
        })
        .catch(error=>alert("Something went wrong in creating user"))

    }

    function handleCallbackResponse(response){
        console.log("Encoded JWt" , response.credential);
        var userObject = jwtDecode(response.credential);
        console.log("jfd",userObject);
        let actionobj = addUser(userObject)
        dispatch(actionobj)
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
        <>
            <form onSubmit={handleSubmit(onFormSubmit)} className ='mx-auto m-5 p-2 pt-5 pb-5 '>
                <p className='h1'>Signup</p>
                <p className='h3 text-start ms-5 mt-4'>User Email</p>
                                
                <input type = "text" id = "un" className="w-75 ms-5 form-control" {...register("email", {required: true})} />
                {errors.email?.type === 'required' && <p>*email Required</p>}

                <p className='h3 text-start ms-5 mt-4'>Password</p>
                <input type = "password" id = "pa" className="w-75 ms-5 form-control" {...register("password", {required: true})} />
                {errors.password?.type === 'required' && <p>*Password Required</p>}

                <div className='text-center mt-2'>
                    <Button type = "Submit" className='bg-dark rounded outline-dark text-light p-2 m-3 ms-0 w-50 '>Create Account</Button>
                </div>
            </form>  
        </>
    );
}

export default Signup;