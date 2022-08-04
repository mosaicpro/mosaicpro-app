import React, {useEffect, useState} from 'react'
import SideNavbar from "../../Elements/Admin/SideNavbar";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import {Button, Form } from "react-bootstrap";
import {FaRegTrashAlt, FaEdit} from 'react-icons/fa'
import axios from "axios";
import moment from "moment";
import CustomModal from '../../Elements/CustomModal';
import Cookies from "js-cookie";
import { isMobileOnly } from "react-device-detect";


function ViewWorkProjectScreen({setNavbar}) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [deleteProjectId, setDeleteProjectId] = useState(0)
    const [editProjectId, setEditProjectId] = useState(0)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [name,setName] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const csrftoken = Cookies.get("csrftoken");

    const openDeleteModalHandler = (projectId) =>{
        setDeleteProjectId(projectId)
        setShowDeleteModal(true)
    }

    const openEditModalHandler = (projectId) =>{
        setEditProjectId(projectId)
        let project = projects.find((a) => a._id==projectId)
        setName(project.name)
        setTitle(project.title)
        setDescription(project.description)
        setShowEditModal(true)
    }

    const config= {
        headers:{
            "Authorization": "Bearer "+userInfo.token
     }
    }

    const deleteProjectHandler = () =>
    {
        axios.get('/api/project/delete/'+deleteProjectId+'/', config).then(() => {
            setDeleteProjectId('')
            setShowDeleteModal(false)
            window.location.reload(false)
        }).catch((e) => console.log(e.request))
    }

    const editProjectHandler = () =>
    {
        const config = {
              "X-CSRFToken": csrftoken,
              "Authorization": "Bearer "+userInfo.token
          };

        let formdata = new FormData()

        formdata.append('name', name)
        formdata.append('title', title)
        formdata.append('description', description)

        axios({
            method:'POST',
            url:'/api/project/update/'+editProjectId+'/',
            data:formdata,
            headers:config
          }).then(() => {
            setEditProjectId(0)
            setShowEditModal(false)
            window.location.reload(false)
          })
        
    }

    useEffect(() => {
        setNavbar(false)
        if (!userInfo) {
          navigate("/")
        }
        axios.get("/api/projects").then((resp) => setProjects(resp.data));

      }, []);
      
  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className={isMobileOnly ? "w-100  d-flex vh-100":"w-100  d-flex "}>
      <SideNavbar />
      <div className={isMobileOnly ? "bg-light m-auto mt-5 rounded w-100":"bg-light m-auto mt-5 rounded w-70" }>
        <div className=" pt-3 ps-3">
          <Link
            to={"/"}
            className="text-decoration-none text-primary border-0 text-left"
          >
            back to homepage
          </Link>
        </div>
        <h3 className="text-center poppins pt-3 pb-3 w-100">
          View Work Projects
        </h3>
        <div className='w-70 m-auto d-flex justify-content-end '>
            <Link 
                to={"/admin/project-create"} 
                className='mt-3 mb-3 btn bg-primary text-light'>
            Create Project</Link>
        </div>
        <div className="d-flex justify-content-center pt-3 ps-3 pe-3 ">
        <Table responsive={isMobileOnly} className={ isMobileOnly ? 'w-100 ':'w-75'} bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        { projects.sort(function(a,b){
            return  b._id - a._id;
          }).map((project) => (
            <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.name}</td>
                <td>{moment(project.createdAt).fromNow()}</td>
                <td className='text-primary text-center'>
                    <FaEdit onClick={() => openEditModalHandler(project._id)} size={24} className='ms-3 me-3'/>
                    <FaRegTrashAlt onClick={() => openDeleteModalHandler(project._id)} size={24}/>
                </td>
            </tr>
            ))}    
        </tbody>
        </Table>
        </div>
      </div>
       <CustomModal show={showDeleteModal} title={'Delete Project'}> 
         <div>
            Are you sure you want to delete this project?               
         </div> 
         <div className='w-100 p-3 text-end'>
         <Button
              onClick={() =>setShowDeleteModal(false)}
              className="btn text-primary btn-outline-primary bg-light me-3"
            >
              Cancel
            </Button>
         <Button
              onClick={deleteProjectHandler}
              style={{
                backgroundColor:'#DC3545',
                border:'#DC3545 1px solid'
              }}
              className="btn text-light "
            >
              Delete
            </Button>  
        </div>  
      </CustomModal> : <></> 
      <CustomModal show={showEditModal} title={'Edit Project'}> 
      <Form className="ps-5 pe-5 pt-0 pb-3">
              <Form.Group controlId="formProjectName" className="mb-3">
                <Form.Label>Project Name:</Form.Label>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group> 
            </Form>

      <div className='w-100 p-3 text-end'>
         <Button
              onClick={() =>setShowEditModal(false)}
              className="btn text-primary btn-outline-primary bg-light me-3"
            >
              Cancel
            </Button>
         <Button
              onClick={editProjectHandler}
              style={{
              }}
              className="btn text-light bg-primary"
            >
              Save
            </Button>  
        </div>  
      </CustomModal>

    </div>
  )
}

export default ViewWorkProjectScreen