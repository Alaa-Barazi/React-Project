import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext } from 'react';
import { BlogContext } from '../blogs';
import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Blogs() {
  const { blogs, newBlog, deleteBlog, editBlog, BlogsForUser } = useContext(BlogContext);
  const username = JSON.parse(localStorage.getItem("username"));
  const [blogsToShow, setBlogs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
       
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.blog.title}
            {console.log(props)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "20px", color: "black" }}>
            {props.blog.body}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <br /><br />
      <button onClick={() => setBlogs(BlogsForUser(username))} className='btn btn-info'>My Blogs </button>
      &nbsp;
      <button onClick={() => setBlogs(blogs)} className='btn btn-primary'>All Blogs </button>
      <br /> <br />
      <div className="row mb-2">
        {blogsToShow.map((blog) =>
          <>
            <div key={blog.id} className="col-md-6" >
              <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">Article</strong>
                  <h2 className="mb-0">{blog.title}</h2>
                  <div className="mb-1 text-muted">{blog.date}</div>
                  <p className="card-text mb-auto">{blog.body}</p>

                  <button className="btn btn-outline-primary rounded" onClick={() => setModalShow(true)}>
                    More </button>
                  <MyVerticallyCenteredModal
                    blog={blog}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
                <div key={blog.id} className="col-auto d-none d-lg-block" >
                  <svg className="bd-placeholder-img" width="50" height="250" role="img" ></svg>
                  <img src={blog.imgURL}
                    style={{
                      position: "static", width: "250px", height: "200px", marginTop: "15px"
                      , alignItems: "center", borderRadius: "15px"
                    }} />
                </div>
                {blog.username === username &&
                  <div className="col-md-0">
                    <div className="btn-group m-1 btn-group-md ">
                      <Link to={`/DeleteBlog/${blog.id}`}
                        className="btn btn-danger rounded">
                        Delete
                      </Link>
                      &nbsp;
                      <Link to={`/EditBlog/${blog.id}`} className="btn btn-success rounded">
                        Edit
                      </Link>
                    </div>
                  </div>}
              </div>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  )
}