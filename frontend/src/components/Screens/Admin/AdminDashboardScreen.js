import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import {
  FaUsers,
  FaRegStickyNote,
  FaRegFolderOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import SideNavbar from "../../Elements/Admin/SideNavbar";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userActions";
import { isMobileOnly, isMobile } from "react-device-detect";


function AdminDashboardScreen({ setNavbar }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    setNavbar(false);
    if (!userInfo) {
      navigate("/");
    }
  });

  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className={isMobileOnly ? "w-100 d-flex vh-100":"w-100  d-flex " }>
      <SideNavbar />
      <div className={isMobileOnly ? " bg-light m-auto mt-5 rounded w-100":"bg-light m-auto mt-5 rounded w-70" }>
        <div className=" pt-3 ps-3">
          <Link
            to={"/"}
            className="text-decoration-none text-primary border-0 text-left"
          >
            {" "}
            back to homepage
          </Link>
        </div>
        <h3 className="text-center poppins pt-3 pb-3 w-100">Dashboard</h3>
        <Container>
          <Row>
            <Col className="text-center h5 text-primary p-3">
              <div>
                <Link to={"/admin/blog"}>
                  <FaRegStickyNote size={70} />
                </Link>
              </div>
              <div>
                <Link to={"/admin/blog"} className="text-decoration-none">
                  Blog Posts
                </Link>
              </div>
            </Col>
            <Col className="text-center h5 text-primary p-3">
              <div>
                <Link to={"/admin/project"}>
                  <FaRegFolderOpen size={70} />
                </Link>
              </div>
              <div>
                <Link to={"/admin/project"} className="text-decoration-none">
                  Work Projects
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center h5 text-primary  p-3">
              <div>
                <Link to={"/admin/users"}>
                  <FaUsers size={70} />
                </Link>
              </div>
              <div>
                <Link to={"/admin/users"} className="text-decoration-none">
                  Users
                </Link>
              </div>
            </Col>
            <Col className="text-center h5 text-primary p-3">
              <div onClick={logoutHandler}>
                  <FaSignOutAlt size={70} />
              </div>
                <div onClick={logoutHandler}
                 className="text-decoration-none">
                  Logout
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboardScreen;
