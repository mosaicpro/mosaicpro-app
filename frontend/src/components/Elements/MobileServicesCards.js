import React from "react";

function MobileServicesCards({ services }) {
  return (
    <div>
      <div className="d-md-none d-flex overflow-auto">
        {services.map((service) => (
          <div className="mx-3">{service} </div>
        ))}
      </div>
    </div>
  );
}

export default MobileServicesCards;
