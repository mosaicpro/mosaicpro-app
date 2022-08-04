import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar from "../../Elements/Admin/SideNavbar";
import {FaRegTrashAlt, FaEdit} from 'react-icons/fa'
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import Table from 'react-bootstrap/Table';
import {Button, Form } from "react-bootstrap";
import CustomModal from '../../Elements/CustomModal';
import { isMobileOnly } from "react-device-detect";




function ManageUsersScreen({ setNavbar }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const csrftoken = Cookies.get("csrftoken");

  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [deleteUserId, setDeleteUserId] = useState(0)
  const [editUserId, setEditUserId] = useState(0)

  const [editEmail,setEditEmail] = useState('')
  const [editFirstname,setEditFirstname] = useState('')
  const [editLastname,setEditLastname] = useState('')
  const [editIsAdmin,setEditIsAdmin] = useState(false)

  const [createEmail,setCreateEmail] = useState('')
  const [createFirstname,setCreateFirstname] = useState('')
  const [createLastname,setCreateLastname] = useState('')
  const [createPassword,setCreatePassword] = useState('')
  const [createIsAdmin,setCreateIsAdmin] = useState(false)

  
  const config= {
    headers:{
        "Authorization": "Bearer "+userInfo.token,
        "X-CSRFToken": csrftoken,
    }
  }

  useEffect(() => {
    setNavbar(false);
    if (!userInfo) {
      navigate("/");
    }
    axios.get("/api/users/",config).then((resp) => setUsers(resp.data));
  }, []);

const openDeleteModalHandler = (userId) =>{
  setDeleteUserId(userId)
  setShowDeleteModal(true)
}

const openEditModalHandler = (userId) =>{
  setEditUserId(userId)
  let user = users.find((a) => a.id==userId)
  setEditEmail(user.email)
  setEditFirstname(user.first_name)
  setEditLastname(user.last_name)
  setEditIsAdmin(user.isAdmin)
  setShowEditModal(true)
}

const openCreateModalHandler = () => {
  setShowCreateModal(true)
}

const deleteUserHandler = () =>
{
    axios.get('/api/users/delete/'+deleteUserId+'/', config).then(() => {
        setDeleteUserId('')
        setShowDeleteModal(false)
        window.location.reload(false)
    }).catch((e) => console.log(e.request))
}

const editUserHandler = () =>
{

  let headers = {
    "X-CSRFToken": csrftoken,
    "Authorization": "Bearer "+userInfo.token
};

let formdata = new FormData()

formdata.append('email', editEmail)
formdata.append('firstname', editFirstname)
formdata.append('lastname', editLastname)
formdata.append('isAdmin', editIsAdmin ? 'True' :'False')

axios({
  method:'POST',
  url:'/api/users/update/'+editUserId+'/',
  data:formdata,
  headers:headers
}).then(() => {
  setEditUserId(0)
  setShowEditModal(false)
  window.location.reload(false)
})

}

const createUserHandler = () =>
{
  let headers = {
    "X-CSRFToken": csrftoken,
    "Authorization": "Bearer "+userInfo.token
};

let formdata = new FormData()

formdata.append('email', createEmail)
formdata.append('firstname', createFirstname)
formdata.append('lastname', createLastname)
formdata.append('password', createPassword)
formdata.append('isAdmin', createIsAdmin ? 'True' :'False')

axios({
  method:'POST',
  url:'/api/users/register/',
  data:formdata,
  headers:headers
}).then(() => {
  setEditUserId(0)
  setShowEditModal(false)
  window.location.reload(false)
})
}

  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className={isMobileOnly ? "w-100  d-flex vh-100":"w-100  d-flex"}>
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
        <h3 className="text-center poppins pt-3 pb-3 w-100">Users</h3>
        <div className='w-75 m-auto d-flex justify-content-end '>
            <Button 
                onClick={openCreateModalHandler}
                className='mt-3 mb-3 btn bg-primary text-light'>
            Create User</Button>
        </div>
        <div className="d-flex justify-content-center pt-3 ps-3 pe-3">
        <Table  responsive={isMobileOnly}  className={ isMobileOnly ? 'w-100 ':'w-75'} bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Date Created</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        { users.sort(function(a,b){
            return  b.id - a.id;
          }).map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{moment(user.createdAt).fromNow()}</td>
                <td className='text-primary text-center'>
                    <FaEdit onClick={() => openEditModalHandler(user.id)} size={24} className='ms-3 me-3'/>
                    <FaRegTrashAlt onClick={() => openDeleteModalHandler(user.id)} size={24}/>
                </td>
            </tr>
            ))}    
        </tbody>
        </Table>
        <CustomModal show={showDeleteModal} title={'Delete User'}> 
         <div>
            Are you sure you want to delete this user?               
         </div> 
         <div className='w-100 p-3 text-end'>
            <Button
              onClick={() =>setShowDeleteModal(false)}
              className="btn text-primary btn-outline-primary bg-light me-3"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteUserHandler}
              style={{
                backgroundColor:'#DC3545',
                border:'#DC3545 1px solid'
              }}
              className="btn text-light "
            >
              Delete
            </Button>  
          </div>  
        </CustomModal>
        <CustomModal show={showEditModal} title={'Edit User'}> 
          <Form className="ps-5 pe-5 pt-0 pb-3">
              <Form.Group controlId="formEditUserName" className="mb-3">
                <Form.Label>User Name (email):</Form.Label>
                <Form.Control
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </Form.Group> 
              <Form.Group controlId="formEditFirstName" className="mb-3">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={editFirstname}
                  onChange={(e) => setEditFirstname(e.target.value)}
                />
              </Form.Group> 
              <Form.Group controlId="formEditLastName" className="mb-3">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={editLastname}
                  onChange={(e) => setEditLastname(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEditIsStaff" className="mb-3">
                <Form.Label>Is staff?</Form.Label>
                <Form.Check
                  type="switch"
                  defaultChecked={editIsAdmin}
                  onChange={(e) => setEditIsAdmin(e.target.checked)}
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
              onClick={editUserHandler}
              className="btn text-light bg-primary"
            >
              Save
          </Button>  
        </div>  
      </CustomModal>
        <CustomModal show={showCreateModal} title={'Create User'}>
        <Form className="ps-5 pe-5 pt-0 pb-3">
              <Form.Group controlId="formCreateUserName" className="mb-3">
                <Form.Label>User Name (email):</Form.Label>
                <Form.Control
                  type="email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCreateFirstName" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
               </Form.Group>  
              <Form.Group controlId="formCreateFirstName" className="mb-3">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={createFirstname}
                  onChange={(e) => setCreateFirstname(e.target.value)}
                />
              </Form.Group> 
              <Form.Group controlId="formCreateLastName" className="mb-3">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={createLastname}
                  onChange={(e) => setCreateLastname(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCreateIsStaff" className="mb-3">
                <Form.Label>Is staff?</Form.Label>
                <Form.Check
                  type="switch"
                  defaultChecked={createIsAdmin}
                  onChange={(e) => setCreateIsAdmin(e.target.checked)}
                />
              </Form.Group>
          </Form>   
        <div className='w-100 p-3 text-end'>
          <Button
              onClick={() =>setShowCreateModal(false)}
              className="btn text-primary btn-outline-primary bg-light me-3"
            >
              Cancel
          </Button>
          <Button
              onClick={createUserHandler}
              className="btn text-light bg-primary"
            >
              Create
          </Button>  
        </div>  
      </CustomModal>


        </div>
      </div>
      </div>
  );
}

export default ManageUsersScreen;
