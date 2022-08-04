import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa'


function ProjectImageUploadFrame({projectId}) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const csrftoken = Cookies.get("csrftoken");
    const [project, setProject] =  useState([])
    const navigate = useNavigate();
    const [name, setName]=useState('')
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [editProject, setEditProject] = useState(false)


    useEffect(() => {
        if (!userInfo) {
          navigate("/")
        }
        getProject()

      }, []);

      const getProject = () => {
        axios.get("/api/projects/"+projectId+"/").then((resp) => {
            setProject(resp.data)
            setName(resp.data.name)
            setTitle(resp.data.title)
            setDescription(resp.data.description)
        });
    }
    
    const  undoHandler = () => {
        setName(project.name)
        setTitle(project.title)
        setDescription(project.description)
        setEditProject(false)
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
            url:'/api/project/update/'+projectId+'/',
            data:formdata,
            headers:config
          }).then(() => {
            getProject()
            setEditProject()
        })
        
    }

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('project_id', projectId)

        const config= {
            headers:{
                "Content-Type":'multipart/form-data',
                "X-CSRFToken": csrftoken,
                "Authorization": "Bearer "+userInfo.token
         }
        }
    
        axios.post('/api/project/upload-image/', formData, config).then(() => {
           return axios.get("/api/projects/"+projectId+"/").then((resp) => {
                setProject(resp.data)
            });
        })
       
    }

    const bannerUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('imageBanner', file)
        formData.append('project_id', projectId)

        const config= {
            headers:{
                "Content-Type":'multipart/form-data',
                "X-CSRFToken": csrftoken,
                "Authorization": "Bearer "+userInfo.token
         }
        }
        axios.post('/api/project/upload-banner/', formData, config).then(() => {
            return axios.get("/api/projects/"+projectId+"/").then((resp) => {
                 setProject(resp.data)
             });
         })
    }


  return (
    <>
    <Form className='w-75 mb-5'>
       <div className='w-100 d-flex justify-content-end'>
           <div onClick={() => setEditProject(true)} className='text-primary'>
               <FaEdit className='me-1 mb-1'/> <span className='m-0'>Edit</span>
           </div>
       </div>
       <Form.Group controlId="formName" className="mb-3">
           <Form.Label>Name:</Form.Label>
           <Form.Control 
               disabled={!editProject}
               type="text"  
               onChange={(e) => setName(e.target.value)}  
               value={name}/>
       </Form.Group>
       <Form.Group controlId="formTitle" className="mb-3">
           <Form.Label>Title:</Form.Label>
           <Form.Control
            disabled={!editProject}
            type="text" 
            onChange={(e) => setTitle(e.target.value)}  
            value={title}/>
       </Form.Group>
       <Form.Group controlId="formDescription" className="mb-3">
           <Form.Label>Description:</Form.Label>
           <Form.Control 
               type="text"
               disabled={!editProject}  
               onChange={(e) => setDescription(e.target.value)}  
               value={description}/>
       </Form.Group>
       {editProject &&
           (<div className='w-100 d-flex justify-content-end'>
               <Button onClick={undoHandler} variant="outline-primary" className='me-2'>Undo</Button>
               <Button onClick={editProjectHandler} className='btn bg-primary'> Save Changes</Button>
           </div>)}
    </Form> 
    <Form className='w-75 mb-5'>
       <Form.Group controlId="formImageFile" className="mb-3">
           <Form.Label>Project Image:</Form.Label>
           <Form.Control type="file" onChange={imageUploadHandler}/>
           {project.image!=null && (<div className='mt-3 mb-3'>
               <Image 
               style={{width:'125px', height:'125px'}}
               src={project.image}   
               ></Image>
           </div>)}
       </Form.Group>
       <Form.Group controlId="formBannerFile" className="mb-3">
           <Form.Label>Banner image:</Form.Label>
           <Form.Control type="file" onChange={bannerUploadHandler}/>
           {project.imageBanner!=null && (<div className='mt-3 mb-3'>
               <Image 
               style={{width:'400px', height:'200px'}}
               src={project.imageBanner}   
               ></Image>
           </div>)}
       </Form.Group>
   </Form>
   <div className="w-100 d-flex justify-content-end mb-2">                   
       <Link to={'/work/'+projectId} className="fw-bold btn text-decoration-none btn-primary m-3">Preview</Link>
   </div>
</>
  )
}

export default ProjectImageUploadFrame