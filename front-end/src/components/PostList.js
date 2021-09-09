import React,{useEffect,useCallback, useContext} from 'react';
import '../css/Post.css';
import axios from 'axios';
import AppContext from './AppContext';
import PostItem from './PostItem'

function PostList(props) {
    const {state,dispatch} = useContext(AppContext);
    const {posts,user} = state;
    const getAllPost = useCallback(
        async () =>{
            try{
                const option = {
                    method: "get",
                    url:"/api/v1/posts",
                };
                const response = await axios(option);
                const posts = response.data.data.posts;
                dispatch({type:"GET_ALL_POST",payload:posts})
            }catch(error){
                console.log(error)
            }
        },[dispatch])
    useEffect(() =>{
        getAllPost( )
    },[getAllPost])
    const newPosts = posts.map((post) =>{
        if(user){
            return post.author.name === user.userName
            ? {...post,isEditable:true}
            :post;

        }else{
            return{...post,isEditable:false};
        }
    });
    console.log('newpost',newPosts);
    return (
        <section className="post-section">
        <div className="post-list">
        {newPosts.map((data) =>(
            <PostItem data ={data} key ={data._id}/>
        )) }
        </div>
    </section>

    );
}

export default PostList;