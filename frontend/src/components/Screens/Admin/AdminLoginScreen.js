import { isMobile } from "react-device-detect";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userActions";
import Message from "../../Message";
import Loader from "../../Elements/Loader";

function AdminLoginScreen({ setNavbar }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    setNavbar(false);
    if (userInfo) {
      navigate("/admin/dashboard");
    }
  }, [[navigate, userInfo]]);
  return (
    <div>
      <div style={{ backgroundColor: "#f3f4f6" }} className="w-100 vh-100">
        <div className="navbar-spacer">&nbsp;</div>
        <div className={isMobile ? "w-100 bg-light m-auto mt-5 rounded" : "w-50 bg-light m-auto mt-5 rounded " }>
          <div className=" pt-3 ps-3">
            <Link
              to={"/"}
              className="text-decoration-none text-primary border-0 text-left"
            >
              back to homepage
            </Link>
          </div>
          <h3 className="text-center poppins pt-3 pb-3 w-100">Login:</h3>
          <div className="w-75 m-auto">
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          </div>
          <div className={isMobile ? "w-100  m-auto mt-3 p-3" : "w-50 mt-3 p-3 m-auto"}>
            <Form onSubmit={submitHandler}>
              <Form.Group
                controlId="formEmail"
              >
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group
                controlId="formPassword"
              >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <div className="d-flex justify-content-end w-100">
              <Button type="submit" variant="primary">
                Sign In
              </Button>
              </div>
            </Form>
          </div>
          <div className="d-flex justify-content-center w-100 align-items-center pt-3 pb-3 ">
            <p className="text-center poppins mb-0">powered by</p>
            <Image
              className="nav-logo"
              src="../static/images/mosaic_logo.png"
              alt="mosaic pro logo"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
