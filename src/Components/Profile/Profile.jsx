import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../users';
import api from './../../api/books';
export default function Profile (){
  const { users, createUser, editUser, trueInputs } = useContext(UserContext);
  const [show, setShow] = useState(false);
 const [blog,setBlog] = useState(0);
    const user = JSON.parse(localStorage.getItem('username'));
    const psw = JSON.parse(localStorage.getItem('password'));
    const img = JSON.parse(localStorage.getItem('img'));
    const id = JSON.parse(localStorage.getItem('id'));
    const retreiveallBlogs = async () => {
      const response = await api.get("/blogs");
      return response.data;
  }
  let cnt=0;
 
  useEffect(() => {
    const fetchData = async () => {
      const allBlogs = await retreiveallBlogs();
      const filters = allBlogs.filter(blog => blog.username === user);
      cnt = filters.length;
      
       setBlog(cnt);
      localStorage.setItem('blogs',blogs);
     
    };

    fetchData();
  }, []);
   const blogs = blog;
    
    const [name,setName] = useState(user);
    const [imgUrl,setImg] = useState(img);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = ()=>{
    handleClose();
    //username,password,imgUrl,blogs,id
    editUser(name,psw,imgUrl,blogs,id);
    window.location.reload(false);

  }
  
    return (
        <section className="vh-100 " 
        style={{backgroundColor: "#eee",alignSelf:"center",marginTop:"5%",marginBottom:"5%",marginLeft:"1%",marginRight:"20%"}}>
<div className="container py-5 h-100" style={{alignSelf:"center"}}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-12 col-xl-4">
        <div className="card" style={{borderRadius: "15px"}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src={img}
                className="rounded-circle img-fluid" style={{width: "100px"}} />
            </div>
            <h4 className="mb-2">{user}</h4>
            <p className="text-muted mb-4">Blogs <span className="mx-2">|</span> <a
                href="#!">{blogs} </a></p>
           
            <button type="button" className="btn btn-primary btn-rounded btn" onClick={handleShow}>
              Edit now
            </button>
         
            &nbsp;
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
                <pre>Name</pre>
             
              <Form.Control
                type="text"
               value={name}
                autoFocus
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
             
            >
                <pre>ImgURL</pre>
                <Form.Control
                type="text"
               value={imgUrl}
               onChange={(e)=>setImg(e.target.value)}
               
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
          
        </div>
        
      </div>
     
    </div>
    
  </div>
  
</section>
    )
}