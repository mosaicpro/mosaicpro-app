import React from "react";
import { Row, Col } from "react-bootstrap";
import CircularCard from "../../Elements/CircularCard";
import MobileServicesCards from "../../Elements/MobileServicesCards";
import { isMobile, isTablet } from "react-device-detect";

function ServicesFrame() {
  const size = isMobile ? "250px" : "300px";

  const service1 = (
    <CircularCard
      size={size}
      classList="child bg-primary text-light fw-bold h3 mb-3"
      cardTitle="Web & Mobile Design"
    >
      <div className="fw-normal h5">we build for <br/>mobile and web,<br/> creating intuitive, <br/> user experiences <br/> to build confidence <br/>in your brand.</div>
    </CircularCard>
  );
  const service2 = (
    <CircularCard
      size={size}
      classList="child text-light fw-bold h3 mb-3 bg-tertiary"
      cardTitle="Web Development & Testing"
    >
      <div className="fw-normal h5">Our web apps scale <br/> with your business. 
      <br/>We use test driven development to  <br/> ensure users  can <br/> rely on your site.
</div>
    </CircularCard>
  );
  const service3 = (
    <CircularCard
      size={size}
      classList="child text-light fw-bold h3 mb-3 bg-secondary"
      cardTitle="Digital Marketing"
    >
      <div className="fw-normal h5">Your brand is more <br/>  than your website.<br/> We harness<br/> social media  <br/> to  connect with  <br/>  new audiences.</div>
    </CircularCard>
  );
  const service4 = (
    <CircularCard
      size={size}
      classList="child bg-primary text-light fw-bold h3 mb-3"
      cardTitle="Payment systems & User Accounts"
    >
      <div className="fw-normal h5">We develop systems<br/> to manage and track<br/>  the entire sales process<br/> in person and online.</div>
    </CircularCard>
  );
  const service5 = (
    <CircularCard
      size={size}
      classList="child text-light fw-bold h3 mb-3 bg-secondary"
      cardTitle="CRM services"
    >
      <div className="fw-normal h5">Keep on top of your <br/> customer experiences <br/> with the tools to gain <br/> insight into <br/>  your business.</div>
    </CircularCard>
  );
  const service6 = (
    <CircularCard
      size={size}
      classList="child text-light fw-bold h3 mb-3 bg-tertiary"
      cardTitle="API Integration"
    >
      <div className="fw-normal h5">Connect to external <br/> web services<br/> to automate your workflow</div>
    </CircularCard>
  );
  const services = [service1, service2, service3, service4, service5, service6];
  return (
    <div className="min-vh-md-100 d-md-flex align-content-center">
      <h3
        className={
          "h3 mb-3 text-dark ms-4 h-50 avalon ps-3  border-3 border-primary border-start"
        }
      >
        our services
      </h3>
      {isMobile && !isTablet ? (
        <MobileServicesCards services={services} />
      ) : (
        <Row className="d-none d-md-flex justify-content-center align-items-center m-auto ">
          {services.map((service, key) => (
            <Col key={key} className="parent" md={4}>
              {service}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ServicesFrame;
