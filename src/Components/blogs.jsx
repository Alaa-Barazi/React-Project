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

        const response = await api.post('/blogs',blog);
      
        if(response){
            let currentBlogs = parseInt(localStorage.getItem('blogs'));
            let id = JSON.parse(localStorage.getItem('id'));
            currentBlogs+=1;
            localStorage.setItem('blogs',currentBlogs);  
            const response2 = await api.patch(`/users/${id}`, {
                blogs: currentBlogs
             });
        }
    }
    const deleteBlog = async(id)=>{
        const response = await api.delete(`/blogs/${id}`);
        if(response){
            let currentBlogs = parseInt(localStorage.getItem('blogs'));
            currentBlogs-=1;
            localStorage.setItem('blogs',currentBlogs);   
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
    <BlogContext.Provider value={{ blogs,newBlog,deleteBlog,editBlog,BlogsForUser }}>
        {props.children}
    </BlogContext.Provider>


);

}