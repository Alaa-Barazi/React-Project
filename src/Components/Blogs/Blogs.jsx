import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext } from 'react';
import { BlogContext } from '../blogs';
export default function Blogs(){
    const {blogs, newBlog, deleteBlog, editBlog, BlogsForUser } = useContext(BlogContext);
    const username = JSON.parse(localStorage.getItem("username"));
    const [show,setShow] = useState("None");
    const [blogsToShow,setBlogs] = useState([]);
    return (
        <>
        <br/><br/>
        <button onClick={()=>setBlogs(BlogsForUser(username))} className='btn btn-info'>My Blogs </button>
       &nbsp;
        <button onClick={()=>setBlogs(blogs)} className='btn btn-primary'>All Blogs </button>
           <br/> <br/>
            <div className="row mb-2">
                {blogsToShow.map((blog,index)=>
                <>
                 <div className="col-md-6" key={index}>
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">Article</strong>
          <h2 className="mb-0">{blog.title}</h2>
          <div className="mb-1 text-muted">{blog.date}</div>
          <p className="card-text mb-auto">{blog.body}</p>
          <a href="#" className="stretched-link">Continue reading</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg class="bd-placeholder-img" width="50" height="250"  role="img" ></svg>
                    <img src={blog.imgURL} 
                     style={{position:"static",width:"250px",height:"200px",marginTop:"15px"
                , alignItems:"center",borderRadius:"15px" }}/>
        </div>
        {blog.username === username &&
         <div className="col-md-">
           <div className="btn-group m-1 btn-group-sm ">
           <input type="reset" value="Delete" className="btn btn-danger rounded" /> 
           &nbsp; 
             <input type="submit" value="Edit" className="btn btn-success rounded" />
           </div>
         </div>}
      </div>
    </div>
      </>
        )}
    </div>
        </>
    )

}