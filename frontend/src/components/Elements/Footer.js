import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark-blue text-light">
      <Container fluid>
        <Row className="py-4 ms-1">
          <Col xs={12} md={3} className="">
            <div className="my-2"></div>
            <div className=" d-none d-md-block m-0">
              <h4
                className="fw-bold  py-3 d-none d-md-block"
                style={{ color: "white" }}
              >
                Company Info
              </h4>
            </div>
            <h5 className="mt-1">Mosaic Pro Ltd</h5>
            <h5 className="mt-1">Company No: 14122413</h5>
            <h5 className="mt-1">Reading, UK</h5>
          </Col>
          <Col xs={12} md={3}>
            <h4
              className="fw-bold py-3 d-none d-md-block"
              style={{ color: "white" }}
            >
              Contact Us
            </h4>
            <h5 className="my-2">
              <span>For enquiries contact:</span>
              <span>
                <br className="d-block d-md-none" />
              </span>
              <div className="fw-bold mt-1"> amit@mosaicpro.io</div>
            </h5>
          </Col>
          <Col xs={12} md={3}>
            <h4 className="fw-bold py-3 d-none d-md-block"> Follow us on</h4>
            <div className="d-flex my-2">
              <a
                className="link-light h2  pe-2 pt-2 pb-2"
                href="https://www.facebook.com/MosaicPro-102136355862699/"
              >
                <FaFacebookSquare className="fa-lg" />
              </a>
              <a
                className="link-light h2 p-2"
                href="https://www.instagram.com/mosaicpro.io/"
              >
                <FaInstagram className="fa-lg" />
              </a>
              <a
                className="link-light h2 p-2"
                href="https://twitter.com/mosaicproio"
              >
                <FaTwitter className="fa-lg" />
              </a>
              <a
                className="link-light h2 me-2 p-2 "
                href="https://www.youtube.com/channel/UC0GB1l59S_eFBHVzXj4TYGg"
              >
                <FaYoutube className="fa-lg" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
