import React, { useState, useEffect } from "react";
import Banner from "../Elements/Banner";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function WorkProjectScreen({ setSelect, setNavbar }) {
  const [project, setproject] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setNavbar(true);
    setSelect(4);
    async function fetchproject() {
      const { data } = await axios.get(`/api/projects/${id}`);
      setproject(data);
    }

    fetchproject();
  }, []);

  return (
    <div>
      <div className="navbar-spacer">&nbsp;</div>
      <Banner
        background={project.imageBanner}
        width="100vw"
        height="50vh"
        opacity="100%"
        layerColor="rgba(256,256,256,0.1)"
      ></Banner>
      <div className="w-100 min-vh-75 mt-4 mb-4 ms-3 avalon">
        <Link to={"../work/"} className="h5 pt-3 pb-3">
          {" "}
          Back{" "}
        </Link>

        <h1 className="mb-4">{project.title}</h1>
        <p className="poppins fw-normal">{project.description}</p>
      </div>
    </div>
  );
}

export default WorkProjectScreen;
