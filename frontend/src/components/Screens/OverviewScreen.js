import React, { useEffect } from "react";

function OverviewScreen({ setNavbar }) {
  useEffect(() => setNavbar(true), []);
  return <div>OverviewScreen</div>;
}

export default OverviewScreen;
