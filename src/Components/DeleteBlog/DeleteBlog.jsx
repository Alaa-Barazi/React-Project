import { useState, useContext } from 'react';
import { BlogContext } from '../blogs';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
 export default function DeleteBlog(){
    const {blogs, newBlog, deleteBlog, editBlog, BlogsForUser } = useContext(BlogContext);
    const [show, setShow] = useState(true);
    const { blogID } = useParams();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () =>{
        handleClose();
        deleteBlog(blogID);
    }
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this Blog?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete}>
             Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 