import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router'
import axios from 'axios';
import AppContext from './AppContext';
import '../css/Auth.css';
function Register() {
    const {dispatch} = useContext(AppContext);
    const [userInput,setUserInput] = useState({name:"",email:"",password:""});
    const [errorMessage,setErrorMessage] = useState(null);
    const history = useHistory()
    const onChangeHandle =(e) =>{
        setUserInput({ ...userInput, [e.target.name]:e.target.value});

    };
    const onSubmitHandle = async (e) =>{
        try{
            e.preventDefault();
            const option ={
                method:"post",
                url:"/api/v1/auth/register",
                data:userInput
            }
            const response = await axios(option);
            console.log('response',response)
            const {token,userName} = response.data.data;
            localStorage.setItem("token",token);
            dispatch({type:"CURRENT_USER",payload:{userName}});
            history.push("/");
        }catch(err){
            setErrorMessage(err.response.data.message);
        }
    }
    return (
        <section className="auth-container">
            <form className="auth-form" onSubmit={onSubmitHandle}>
                <h2>Register your acourt</h2>
                {errorMessage &&(Array.isArray(errorMessage)?(
                    errorMessage.map((err) =>(
                        <div className ="error-message">Error:{err}</div>
                    ))
                ):(
                    <div className="error-message">Error: {errorMessage}</div>
                ))}
                <input type = "name" name ="name" id="" required placeholder="Name" value={userInput.name} onChange={onChangeHandle}/>
                <input type = "email" name ="email" id="" required placeholder="Email" value={userInput.email} onChange={onChangeHandle}/>
                <input
                type="password"
                name="password"
                id=""
                required placeholder="Password"
                value={userInput.password} onChange={onChangeHandle}
                />
                <button type="submit" className="btn">Register</button>
            </form>
        </section>
    );
}

export default Register;