import {useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import {addUser, removeUser} from '../slices/userSlice'
import {useDispatch} from 'react-redux'
import './LoginCSS.css'
import { Button } from 'react-bootstrap';
import React from 'react';


function Signup(){

    
    let userData = useSelector(state=>state.child1a)
    const dispatch = useDispatch()

    const {register, handleSubmit, formState:{errors}} = useForm()

    const onFormSubmit = (userData)=>{
        let actionobj = addUser(userData.username)
        console.log(userData)
        console.log(actionobj)
        dispatch(actionobj)
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
            <form onSubmit={handleSubmit(onFormSubmit)} className ='w-25 mx-auto m-5 p-2 pt-5 pb-5 '>
                <p className='h1'>Signup</p>
                <p className='h3 text-start ms-5 mt-4'>User Email</p>
                                
                <input type = "text" id = "un" className="w-75 ms-5 form-control" {...register("username", {required: true})} />
                {errors.username?.type === 'required' && <p>*Username Required</p>}

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