import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { logout } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { isMobile, isMobileOnly } from "react-device-detect";

function SideNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-25">
    {!isMobile 
    ?  
    (<div className="bg-charcoal">
      <div className="h1 avalon text-light fw-normal text-center pt-5">
        MosaicPro
      </div>
      <div className="vh-100 d-flex mt-5 text-start align-items-center flex-column">
        <ul className="m-0 p-0">
          <li>
            <Link
              to={"/admin/dashboard"}
              className="text-light text-decoration-none fw-bold"
            >
              Dashboard
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/blog"}
              className="text-light text-decoration-none fw-bold"
            >
              Blog Posts
            </Link>
          </li>
          <li className="mt-2 ms-2">
            <Link
              to={"/admin/blog-create"}
              className="text-light text-decoration-none"
            >
              Create New Blog Post 
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/project"}
              className="text-light text-decoration-none fw-bold"
            >
              Work Projects
            </Link>
          </li>
          <li className="mt-2 ms-2">
            <Link
              to={"/admin/project-create"}
              className="text-light text-decoration-none"
            >
              Create New Work Project
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/users"}
              className="text-light text-decoration-none fw-bold"
            >
              Users
            </Link>
          </li>
        </ul>
        <div>
          <Button
            onClick={logoutHandler}
            className="mt-5 mb-5 fw-bold ps-5 pe-5 btn-primary me-5"
          >
            logout
          </Button>
        </div>
        <div className="d-flex justify-content-center w-100 align-items-center  ">
          <p className="text-center poppins mb-0 me-2 text-light">powered by</p>
          <Image
            className="nav-logo"
            src="../static/images/mosaic_logo_transparent.png"
            alt="mosaic pro logo"
          ></Image>
        </div>
      </div>
    </div>)
    :
    (
    <> 
    <div className="text-primary" onClick={() => setShowMobileMenu(true)}>
     < FaChevronRight size={24} className=" mt-2 ms-2" />
    </div> 
    <div
          style={{ zIndex: 1030 }}
          className={
            (showMobileMenu ? "d-flex vh-100 " : "d-none ") +
            "fixed-top bg-charcoal w-85 justify-content-start flex-column "
          }
        >
          <div className="w-100 d-flex flex-column align-items-end mt-2 mr-5">
            <button onClick={() => setShowMobileMenu(false)}
              className="bg-charcoal text-light border-0">
              <h1>
                <FaTimes />
              </h1>
            </button>
          </div>
          <div className="h1 avalon text-light fw-normal text-center pt-3 pb-3 ">
            MosaicPro
          </div>
          <ul className="ms-5 p-0">
          <li>
            <Link
              to={"/admin/dashboard"}
              className="text-light text-decoration-none fw-bold"
            >
              Dashboard
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/blog"}
              className="text-light text-decoration-none fw-bold"
            >
              Blog Posts
            </Link>
          </li>
          <li className="mt-2 ms-2">
            <Link
              to={"/admin/blog-create"}
              className="text-light text-decoration-none"
            >
              Create New Blog Post 
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/project"}
              className="text-light text-decoration-none fw-bold"
            >
              Work Projects
            </Link>
          </li>
          <li className="mt-2 ms-2">
            <Link
              to={"/admin/project-create"}
              className="text-light text-decoration-none"
            >
              Create New Work Project
            </Link>
          </li>
          <li className="mt-5">
            <Link
              to={"/admin/users"}
              className="text-light text-decoration-none fw-bold"
            >
              Users
            </Link>
          </li>
        </ul>
        </div>
        </>)}
    </div>

  )    
}

export default SideNavbar;
