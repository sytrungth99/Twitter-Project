import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';
function PostItem(props) {
    const {dispatch} = useContext(AppContext);
    const [postToEdit,setPostToEdit] = useState(props.data);
    const [openEditForm,setOpenEditForm] = useState(false);
    const [OpenDeleteConfirm,setOpenDeleteConfirm] =useState(false)
    let date = new Date(props.data.createdAt);
    const updatePost = async () =>{
        try{
            setOpenEditForm(false);
            const token = localStorage.getItem("token");
            const option ={
                method:"put",
                url:`/api/v1/posts/${props.data._id}`,
                data:postToEdit,
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            };
            await axios(option);
            console.log('posttoedit',postToEdit);
            dispatch({
                type:"UPDATE_ONE_POST",
                payload:{ ...postToEdit},
            });
        }catch(error){
            console.log(error.response);
        }
    };
    const deletePost = async () =>{
        try{
            const token = localStorage.getItem("token");
            const option ={
                method:"delete",
                url:`/api/v1/posts/${props.data._id}`,
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            };
            await axios(option);
            dispatch({
                type:"DELETE_ONE_POST",
                payload:{ _id:props.data._id},
            });
        }catch(error){
            console.log(error);
        }
    };
    return (
        <div className="post-item">
        <p className="post-content">
           {props.data.content}
        </p>
        <div className="post-footer">
            <div className="post-infors">
                <span>{props.data.author.name}</span>
                <span>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</span>
            </div>
            {props.data.isEditable &&(
                <div className="post-edit-delete">
                    {OpenDeleteConfirm ? (
                        <>
                        <span className="delete-question">Are you sure?</span>
                        <span onClick ={() =>deletePost()}>Yes</span>
                        <span onClick={()=> setOpenDeleteConfirm(false)}>No</span>
                        </>
                    ):(
                        <>
                        <span onClick = {() =>setOpenEditForm(true)}>Edit</span>
                        <span onClick = {()=> setOpenDeleteConfirm(true)}>Delete</span>                      
                        </>
                    )}
            </div> 
            )}
        </div>
        {openEditForm&&(
            <>
            <div className="post-edit-form">
            <textarea
            type ="text"
            name ="content"
            id ="content"
            className="content"
            value ={postToEdit.content}
            onChange={(e) =>
            setPostToEdit({ ...postToEdit, content:e.target.value})
            }
            />
            
            <div className="btn-container">
                <button className="btn" type ="button" onClick={() =>updatePost()}>Update</button>
                <button className="btn" type ="button" onClick={() =>setOpenEditForm(false)}>Cancel</button>
            </div>
            </div>
            </>
        )}
    </div>
    );
}

export default PostItem;