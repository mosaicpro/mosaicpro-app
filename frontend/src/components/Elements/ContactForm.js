import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import axios from "axios";
import Cookies from "js-cookie";

function ContactForm({ ...props }) {
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const csrftoken = Cookies.get("csrftoken");

  let errorArr = [];

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (validationRules()) {
      setHasErrors(false);
      setSubmitting(true);
      const formData = {
        email: email,
        message_name: contactName,
        message: contactMessage,
      };
      axios
        .post("/api/contact", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        })
        .then(function (response) {
          setFormCompleted(true);
          setSubmitting(false);
          setTimeout(props.onHide, 4000);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      if (email === "" && !validateEmail(email)) {
        errorArr.push("email");
      }
      if (contactName === "") {
        errorArr.push("name");
      }
      if (contactMessage === "") {
        errorArr.push("message");
      }
      setHasErrors(true);
      setErrors(errorArr);
    }
  };

  const validationRules = () => {
    if (
      email !== "" &&
      validateEmail(email) &&
      contactName !== "" &&
      contactMessage !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div style={{ display: formCompleted ? "none" : "block" }}>
        <Form onSubmit={submitHandler}>
          <div
            style={{ color: "#842029", display: hasErrors ? "block" : "none" }}
            className="p-2 rounded bg-danger mt-3 mb-3"
          >
            The following fields have not be fill out correctly:
            <ul style={{ listStyleType: "disc" }}>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
          <Form.Group
            className={isMobile ? "mb-1" : "mb-3"}
            controlId="formBasicEmail"
          >
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              {isMobile
                ? "We never share your information."
                : "We'll never share your personal information with anyone else."}
            </Form.Text>
          </Form.Group>
          <Form.Group
            className={isMobile ? "mb-1" : "mb-3"}
            controlId="formName"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setContactName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className={isMobile ? "mb-3" : "mb-3"}
            controlId="formEnquiry"
          >
            <div className="mb-2">Tell us how we can help</div>
            <Form.Control
              as="textarea"
              rows={3}
              className="p-2 w-100 rounded input-field"
              type="textarea"
              placeholder="Message"
              onChange={(e) => setContactMessage(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              onClick={props.onHide}
              className="btn text-primary btn-outline-primary bg-light "
            >
              Close
            </Button>
            <Button className="ms-2" variant="primary" type="submit">
              {!submitting ? "Submit" : "Submitting..."}
            </Button>
          </div>
        </Form>
      </div>
      <div
        className="flex-column w-100 justify-content-center"
        style={{ display: formCompleted ? "flex" : "none" }}
      >
        <div className="m-auto">
          <Image width={"300px"} src="../static/images/check_mark.gif" />
        </div>
        <div className="text-center w-100">
          <h5>Thanks for your enquiry. We'll be in touch shortly</h5>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={props.onHide}
            className="btn text-primary btn-outline-primary bg-light "
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
