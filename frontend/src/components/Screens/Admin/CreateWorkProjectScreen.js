import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar from "../../Elements/Admin/SideNavbar";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import ProjectImageUploadFrame from "../../Frames/Admin/ProjectImageUploadFrame";
import { isMobileOnly } from "react-device-detect";



function CreateWorkProjectScreen({ setNavbar }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const [name,setName] = useState("")
  // const [image,setImage] = useState("")
  // const [imageBanner,setImageBanner] = useState("")
  // const [authorThumbnail,setAuthorThumbnail] = useState("")
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const csrftoken = Cookies.get("csrftoken");
  const [projectId, setProjectId] = useState('');
  const [uploadImageFrame, setUploadImageFrame] = useState(false)



  
  useEffect(() => {
    setNavbar(false);
    if (!userInfo) {
      navigate("/");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        "X-CSRFToken": csrftoken,
      },
    };

    let formdata = new FormData()

    formdata.append('name', name)
    formdata.append('title', title)
    formdata.append('description', description)
  
    axios({
    method:"POST",  
    url:"/api/project/create/",
    data:formdata,
    headers:config
  }).then((resp) => {
      setProjectId(resp.data._id)
      setUploadImageFrame(true)
  })

  };


  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className={isMobileOnly ? "w-100  d-flex  vh-100":"w-100  d-flex"}>
      <SideNavbar />
      <div className={isMobileOnly ? "bg-light m-auto mt-5 rounded w-100":"bg-light m-auto mt-5 rounded w-70" } >
        <div className=" pt-3 ps-3">
          <Link
            to={"/"}
            className="text-decoration-none text-primary border-0 text-left"
          >
            back to homepage
          </Link>
        </div>
        <h3 className="text-center poppins pt-3 pb-3 w-100">
          Create New Work Project
        </h3>
        { uploadImageFrame ? (<div className="d-flex flex-column align-items-center justify-content-center "><ProjectImageUploadFrame  projectId={projectId}/></div>) : (
        <Form onSubmit={submitHandler} className="ps-5 pe-5 pt-0 pb-3">
              <Form.Group controlId="formProjectName" className="mb-3">  
                <Form.Label>Work Project Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>  
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Content:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  className="rounded input-field mb-3"
                  type="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>                                                                  
              <div className="w-100 d-flex justify-content-end">                   
                <Button  type="submit" className="fw-bold" variant="primary">
                 Publish
                </Button>
              </div>
            </Form>)
          }
      </div>
    </div>
  );
}

export default CreateWorkProjectScreen;
