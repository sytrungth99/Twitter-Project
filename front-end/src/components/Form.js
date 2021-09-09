import React, { useContext, useState } from 'react';
import '../css/Form.css';
import axios from 'axios';
import AppContext from './AppContext';
function Form() {
    const {state,dispatch} = useContext(AppContext);
    const {user} = state;
    const [postInput,setPostInput] = useState({content:""});
    const [errorMessage,setErrorMessage] = useState(null);
 
    const onSubmitHandle = async (e) =>{
        try{
            e.preventDefault();
            const token = localStorage.getItem("token");
            const option ={
                method:"post",
                url:`/api/v1/posts/`,
                data:postInput,
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            };
            const response = await axios(option);
            console.log('response',response);
            const {post} = response.data.data;
            const author = {_id:post.author,name:user.userName};
            const test ={...post,author,isEditable:true};
            console.log('test',test);
            dispatch({
                type:"CREATE_ONE_POST",
                payload:{...post,author,isEditable:true}
            });
            setPostInput({content:""});
        }catch(error){
                setErrorMessage(error.response.data.message);
        }
        };
    return (
        <section className="form-section">
            <form className="form">
                {errorMessage &&(
                    <div className="error-message">Error:{errorMessage}</div>
                )}
                <textarea
                type="text"
                name="content"
                id="content"
                className="content"
                value = {postInput.content}
                onChange ={(e) =>
                setPostInput({ ...postInput,[e.target.name]:e.target.value})
                }
                placeholder="what is happening?">
                </textarea>
                <button className="btn" type ="button" onClick={onSubmitHandle}>twitter</button>
            </form>
        </section>
    );
}

export default Form;