import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa'


function PostImageUploadFrame({ postId }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const csrftoken = Cookies.get("csrftoken");
    const [post, setPost] =  useState([])
    const navigate = useNavigate();
    const [name, setName]=useState('')
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [authorName, setAuthorName]=useState('')
    const [editPost, setEditPost] = useState(false)


    
    useEffect(() => {
        if (!userInfo) {
          navigate("/")
        }
        getPost()

      }, []);


    const getPost = () => {
        axios.get("/api/posts/"+postId+"/").then((resp) => {
            setPost(resp.data)
            setName(resp.data.name)
            setTitle(resp.data.title)
            setDescription(resp.data.description)
            setAuthorName(resp.data.authorName)
        });
    }  
      
    const  undoHandler = () => {
        setName(post.name)
        setTitle(post.title)
        setDescription(post.description)
        setAuthorName(post.authorName)
        setEditPost(false)
    }

    const editPostHandler = () =>
    {
        const config = {
              "X-CSRFToken": csrftoken,
              "Authorization": "Bearer "+userInfo.token
          };

        let formdata = new FormData()

        formdata.append('name', name)
        formdata.append('authorName', authorName)
        formdata.append('title', title)
        formdata.append('description', description)

        axios({
            method:'POST',
            url:'/api/post/update/'+postId+'/',
            data:formdata,
            headers:config
          }).then(() => {
            getPost()
            setEditPost()
        })
        
    }

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('post_id', postId)

        const config= {
            headers:{
                "Content-Type":'multipart/form-data',
                "X-CSRFToken": csrftoken,
                "Authorization": "Bearer "+userInfo.token
         }
        }
    
        axios.put('/api/post/upload-image/', formData, config).then(() => {
           return axios.get("/api/posts/"+postId+"/").then((resp) => {
                setPost(resp.data)
            });
        })
       
    }

    const bannerUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('imageBanner', file)
        formData.append('post_id', postId)

        const config= {
            headers:{
                "Content-Type":'multipart/form-data',
                "X-CSRFToken": csrftoken,
                "Authorization": "Bearer "+userInfo.token
         }
        }
        axios.post('/api/post/upload-banner/', formData, config).then(() => {
            return axios.get("/api/posts/"+postId+"/").then((resp) => {
                 setPost(resp.data)
             });
         })
    }

    const authorUploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('authorThumbnail', file)
        formData.append('post_id', postId)

        const config= {
            headers:{
                "Content-Type":'multipart/form-data',
                "X-CSRFToken": csrftoken,
                "Authorization": "Bearer "+userInfo.token
         }
        }
        axios.post('/api/post/upload-thumbnail/', formData, config).then(() => {
            return axios.get("/api/posts/"+postId+"/").then((resp) => {
                 setPost(resp.data)

             });
         })
    }
    return (
        <>
             <Form className='w-75 mb-5'>
                <div className='w-100 d-flex justify-content-end'>
                    <div onClick={() => setEditPost(true)} className='text-primary'>
                        <FaEdit className='me-1 mb-1'/> <span className='m-0'>Edit</span>
                    </div>
                </div>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        disabled={!editPost}
                        type="text"  
                        onChange={(e) => setName(e.target.value)}  
                        value={name}/>
                </Form.Group>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                     disabled={!editPost}
                     type="text" 
                     onChange={(e) => setTitle(e.target.value)}  
                     value={title}/>
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        type="text"
                        disabled={!editPost}  
                        onChange={(e) => setDescription(e.target.value)}  
                        value={description}/>
                </Form.Group>
                <Form.Group controlId="formAuthorName" className="mb-3">
                    <Form.Label>Author Name:</Form.Label>
                    <Form.Control 
                        disabled={!editPost}
                        type="text"
                        onChange={(e) => setAuthorName(e.target.value)}  
                        value={authorName}/>
                </Form.Group>
                {editPost &&
                    (<div className='w-100 d-flex justify-content-end'>
                        <Button onClick={undoHandler} variant="outline-primary" className='me-2'>Undo</Button>
                        <Button onClick={editPostHandler} className='btn bg-primary'> Save Changes</Button>
                    </div>)}
             </Form> 
             <Form className='w-75 mb-5'>
                <Form.Group controlId="formImageFile" className="mb-3">
                    <Form.Label>Blog Post Image:</Form.Label>
                    <Form.Control type="file" onChange={imageUploadHandler}/>
                    {post.image!=null && (<div className='mt-3 mb-3'>
                        <Image 
                        style={{width:'125px', height:'125px'}}
                        src={post.image}   
                        ></Image>
                    </div>)}
                </Form.Group>
                <Form.Group controlId="formBannerFile" className="mb-3">
                    <Form.Label>Banner image:</Form.Label>
                    <Form.Control type="file" onChange={bannerUploadHandler}/>
                    {post.imageBanner!=null && (<div className='mt-3 mb-3'>
                        <Image 
                        style={{width:'400px', height:'200px'}}
                        src={post.imageBanner}   
                        ></Image>
                    </div>)}
                </Form.Group>
                <Form.Group controlId="formAuthorFile" className="mb-3">
                    <Form.Label>Author thumbnail:</Form.Label>
                    <Form.Control type="file" onChange={authorUploadHandler}/>
                </Form.Group>
                {post.authorThumbnail!=null && (<div className='mt-3 mb-3'>
                        <Image 
                        style={{width:'80px', height:'80px'}}
                        className='rounded-circle'
                        src={post.authorThumbnail}   
                        ></Image>
                    </div>)}
            </Form>
            <div className="w-100 d-flex justify-content-end mb-2">                   
                <Link to={'/blog/'+postId} className="fw-bold btn text-decoration-none btn-primary m-3">Preview</Link>
            </div>
        </>
    )
}

export default PostImageUploadFrame