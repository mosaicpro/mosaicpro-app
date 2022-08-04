import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar from "../../Elements/Admin/SideNavbar";
import { isMobileOnly } from "react-device-detect";


function ProfileSettingsScreen({ setNavbar }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    setNavbar(false);
    if (!userInfo) {
      navigate("/");
    }
  });
  return (
    <div style={{ backgroundColor: "#f3f4f6" }} className={isMobileOnly ? "w-100  d-flex vh-100":"w-100  d-flex"}>
      <SideNavbar />
      <div className={isMobileOnly ? "bg-light m-auto mt-5 rounded w-100":"bg-light m-auto mt-5 rounded w-70" }>
        <div className=" pt-3 ps-3">
          <Link
            to={"/"}
            className="text-decoration-none text-primary border-0 text-left"
          >
            {" "}
            back to homepage
          </Link>
        </div>
        <h3 className="text-center poppins pt-3 pb-3 w-100">
          Profile Settings
        </h3>
      </div>
    </div>
  );
}

export default ProfileSettingsScreen;
