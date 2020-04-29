import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";

function PantryAddModal(props) {
  const [itemName, setItemName] = useState("");
  const [expiry, setExpiry] = useState("1 week");
  const [location, setLocation] = useState("fridge");
  const [validated, setValidated] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // TODO: validation not working properly
    if (form.checkValidity()) {
      setValidated(true);
      let expiryTimestamp = moment().unix();
      switch (expiry) {
        case "1 week":
          expiryTimestamp = moment().add(1, "week").unix();
          break;
        case "2 weeks":
          expiryTimestamp = moment().add(2, "week").unix();
          break;
        case "3 weeks":
          expiryTimestamp = moment().add(3, "week").unix();
          break;
        case "1 month":
          expiryTimestamp = moment().add(1, "month").unix();
          break;
        case "3 months":
          expiryTimestamp = moment().add(3, "month").unix();
          break;

        default:
          break;
      }
      props.handleAddItem({ itemName, expiry: expiryTimestamp, location });
    }
    props.onHide();
    setItemName("");
    setLocation("fridge");
    setExpiry("1 week");
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
          <Form.Group controlId="formusedby">
            <Form.Label>Used by</Form.Label>
            <Form.Control
              as="select"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            >
              <option>1 week</option>
              <option>2 weeks</option>
              <option>3 weeks</option>
              <option>1 month</option>
              <option>3 months</option>
            </Form.Control>
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
