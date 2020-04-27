import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function PantryAddModal(props) {
  const [itemName, setItemName] = useState("");
  const [expiry, setExpiry] = useState("1 week");
  const [validated, setValidated] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setValidated(true);
      props.handleAddItem({ itemName, expiry });
      props.onHide();
      setItemName("");
      setExpiry("1 week");
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
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
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
