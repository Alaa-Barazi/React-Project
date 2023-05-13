import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext } from 'react';
import { BlogContext } from '../blogs';
import { Link, useNavigate } from "react-router-dom";

export default function NewBlog() {
  const { blogs,newBlog, deleteBlog, editBlog, BlogsForUser } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const username = JSON.parse(localStorage.getItem("username"));
 const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    newBlog(title, text, img, username);
    alert('Added Succefully');
    //Later on navigate to my blogs
    navigate('/Home');
  }

  return (
    <center>
      <div className="container justify-content-center">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters mb-5">
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                    <h3 className="mb-4">New blog</h3>
                    <div id="form-message-warning" className="mb-4"></div>
                    <form method="POST" id="contactForm" name="contactForm" className="contactForm" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="text" className="form-control" name="name" id="name" 
                            placeholder="Title" 
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        {/* <div className="col-md-6">
                          <div className="form-group">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div className="form-group">
                          <br/>
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Img URL" 
                             value={img}
                             onChange={(e)=>setImg(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                          <br/>
                            <textarea name="message" className="form-control" id="message" cols="30" rows="4" placeholder="Text"
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-4 " >
                        <br/>  
                          <div className="btn-group m-3 ">
                          <input type="reset" value="Reset" className="btn btn-secondary rounded" /> 
                          &nbsp; 
                            <input type="submit" value="Create Blog" className="btn btn-primary rounded" />
                          </div>
                          
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-center justify-content-end">
                  <img src="https://www.presse-citron.net/app/uploads/2020/12/Cr%C3%A9er-blog-gratuit.jpg" alt="Image" className="img-fluid"
                   style={{width:"100%",alignSelf:"center",marginRight:"5%",marginTop:"1%",borderRadius:"10%"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  )
}
