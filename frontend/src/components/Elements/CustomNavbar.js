import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function CustomNavbar({
  ref1,
  ref2,
  ref3,
  setModal,
  setSelect,
  selected,
  showNavbar,
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const selectAndScrollDown = (ref) => {
    document.body.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: "smooth",
    });
    setShowMobileMenu(false);
  };
  const selectAndScrollDownWithDelay = (ref) => {
    if (location.pathname.replace("/", "") !== "") {
      navigate("/");
      setTimeout(function () {
        selectAndScrollDown(ref);
      }, 400);
    } else {
      selectAndScrollDown(ref);
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      {showNavbar && (
        <Navbar bg="light" className="navbar" fixed="top">
          <Container fluid className="d-flex justify-content-between w-100">
            <Navbar.Brand>
              <Image
                className="nav-logo"
                src="../static/images/mosaic_logo.png"
                alt="mosaic pro logo"
              ></Image>
            </Navbar.Brand>
            <div className="d-block d-md-none">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="bg-light border-0 text-dark"
              >
                <FaBars className={isMobile ? "fa-2x" : "fa-lg"} />
              </button>
            </div>
            <Nav className="d-none d-md-flex ">
              <li>
                <a
                  href="#"
                  className={
                    (selected === 1 ? "nav-text-underline" : "") +
                    " text-charcoal nav-text me-3 pb-2"
                  }
                  onClick={() => {
                    setSelect(1);
                    selectAndScrollDownWithDelay(ref1);
                  }}
                >
                  home
                </a>
              </li>
              <li>
                <a
                  className={
                    (selected === 2 ? "nav-text-underline " : "") +
                    "text-charcoal  nav-text me-3 pb-2"
                  }
                  onClick={() => {
                    setSelect(2);
                    selectAndScrollDownWithDelay(ref2);
                  }}
                >
                  about us
                </a>
              </li>
              <li>
                <a
                  className={
                    (selected === 3 ? "nav-text-underline " : "") +
                    "text-charcoal nav-text me-3 pb-2"
                  }
                  onClick={() => {
                    setSelect(3);
                    selectAndScrollDownWithDelay(ref3);
                  }}
                >
                  services
                </a>
              </li>
              <li>
                <Link
                  className={
                    (selected === 4 ? "nav-text-underline " : "") +
                    "text-charcoal nav-text me-3 pb-2"
                  }
                  onClick={() => setSelect(4)}
                  to={"/work"}
                >
                  work
                </Link>
              </li>
              <li>
                <Link
                  className={
                    (selected === 5 ? "nav-text-underline " : "") +
                    "text-charcoal nav-text me-3 pb-2"
                  }
                  onClick={() => setSelect(5)}
                  to={"/blog"}
                >
                  blog
                </Link>
              </li>
              <li className="me-3">
                <a
                  className="link-primary nav-text fw-bold"
                  onClick={() => setModal(true)}
                >
                  contact
                </a>
              </li>
              {userInfo ? (
                <li>
                  <Link
                    className=" text-charcoal nav-text me-3 pb-2"
                    to="admin/dashboard"
                  >
                    {" "}
                    admin
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {userInfo ? (
                <li>
                  <Button
                    className=" btn-primary text-light nav-text me-3 pb-2 fw-bold"
                    onClick={logoutHandler}
                  >
                    {" "}
                    logout
                  </Button>
                </li>
              ) : (
                <></>
              )}
            </Nav>
          </Container>
        </Navbar>
      )}
      <div
        style={{ zIndex: 1030 }}
        className={
          (showMobileMenu ? "d-flex " : "d-none ") +
          "fixed-top bg-primary vh-100 vw-100 bg-primary vh-100 vw-100 justify-content-between flex-column align-items-center"
        }
      >
        <div className="w-100 d-flex flex-column align-items-end mt-2 mr-5">
          <button
            onClick={() => setShowMobileMenu(false)}
            className="bg-primary text-light border-0"
          >
            {" "}
            <h1>
              <FaTimes />
            </h1>{" "}
          </button>
        </div>
        <div>
          <ul className="m-0 p-0">
            <li className="mb-4">
              <a
                href="#"
                className="link-light nav-text h1"
                onClick={() => selectAndScrollDownWithDelay(ref1)}
              >
                home
              </a>
            </li>
            <li className="mb-4">
              <a
                className="link-light nav-text h1"
                onClick={() => selectAndScrollDownWithDelay(ref2)}
              >
                about us
              </a>
            </li>
            <li className="mb-4">
              <a
                className="link-light nav-text h1"
                onClick={() => selectAndScrollDownWithDelay(ref3)}
              >
                services
              </a>
            </li>
            <li className="mb-4">
              <Link
                className="link-light nav-text h1"
                onClick={() => setShowMobileMenu(false)}
                to={"/work"}
              >
                work
              </Link>
            </li>
            <li className="mb-4">
              <Link
                className="link-light nav-text h1"
                onClick={() => setShowMobileMenu(false)}
                to={"/blog"}
              >
                blog
              </Link>
            </li>
            <li className="mb-4">
              <a
                className="link-light nav-text fw-bold h1"
                onClick={() => setModal(true)}
              >
                contact
              </a>
            </li>
          </ul>
        </div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}

export default CustomNavbar;
