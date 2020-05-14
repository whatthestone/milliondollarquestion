import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

function PantryAddModal(props) {
  const [itemName, setItemName] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [location, setLocation] = useState("fridge");
  const [cat, setCat] = useState("fruits");
  const [validated, setValidated] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // TODO: validation not working properly
    if (form.checkValidity() && expiry) {
      setValidated(true);
      props.handleAddItem({ itemName, expiry: expiry.unix(), location, cat });
      props.onHide();
      //reset everything
      setItemName("");
      setLocation("fridge");
      setCat("fruits");
      setExpiry(null);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add ingredients
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group controlId="formitemname">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ingredient name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value.toLowerCase())}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formcat">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option>fruits</option>
              <option>vegetables</option>
              <option>meat</option>
              <option>dairy & soy</option>
              <option>bread</option>
              <option>grains</option>
              <option>sauce & condiments</option>
              <option>frozen</option>
              <option>other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formlocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>fridge</option>
              <option>freezer</option>
              <option>dry pantry</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="formusedby"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Form.Label>Used by</Form.Label>
            <DatePicker onChange={(date) => setExpiry(date)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PantryAddModal;
