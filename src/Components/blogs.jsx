import { createContext, useState, useEffect } from "react";
import api from '../api/books';
import uuid from "uuid4";
import { useNavigate } from "react-router-dom";
export const BlogContext = createContext();
export function BlogProvider(props) {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const retreiveallBlogs = async () => {
        const response = await api.get("/blogs");
        return response.data;
    }
    useEffect(() => {
        const getallBlogs = async () => {
            const allBlogs = await retreiveallBlogs();
            if (allBlogs) {
                setBlogs(allBlogs);
            }
        }
        getallBlogs();
    }, []);
//local Storage!!!!
    const newBlog = async(title,text,img,username) =>{
        const blog = {
            id:uuid(),
            title:title,
            body:text,
            imgURL:img,
            username:username
        }

        const response =await api.post('/blogs',blog);
        if(response){
            let currentBlogs = localStorage.getItem('blogs');
            localStorage.setItem('blogs',currentBlogs+1);   
        }
    }
    const deleteBlog = async(id)=>{
        const response = await api.delete(`/blogs/${id}`);
        if(response){
            let currentBlogs = localStorage.getItem('blogs');
            localStorage.setItem('blogs',currentBlogs-1);   
        }

    }
    const editBlog = async (id,title,text,img,username) =>{
        const blog = {
            id:id,
            title:title,
            body:text,
            imgURL:img,
            username:username
        }
        const response = await api.put(`/blogs/${id}`,blog);
    }
    const BlogsForUser = (username) =>{
        const UserBlogs = blogs.filter(blog => blog.username === username);
        return UserBlogs;
        //return array blogs;
    }
return (
    <BlogContext.Provider value={{blogs,newBlog,deleteBlog,editBlog,BlogsForUser}}>
        {props.children}
    </BlogContext.Provider>
);

}