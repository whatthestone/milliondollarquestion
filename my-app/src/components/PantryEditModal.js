import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import "antd/dist/antd.css";
import Avatar from "./Avatar";

function PantryEditModal(props) {
  const [itemName, setItemName] = useState(props.item?.name);
  const [expiry, setExpiry] = useState(props.item?.expiry);
  const [location, setLocation] = useState(props.item?.location);
  const [cat, setCat] = useState(props.item?.cat);
  const [validated, setValidated] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // TODO: validation not working properly
    if (form.checkValidity() && expiry) {
      setValidated(true);
      props.handleEditItem({
        itemName,
        expiry: expiry,
        location,
        cat,
        key: props.item.key,
      });
      props.onHide();
    }
  };

  const deleteItem = () => {
    props.deleteItemHandler(props.item.key);
    props.onHide();
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
          Edit ingredients
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group controlId="formimg">
            <Form.Label>Upload a photo</Form.Label>
            <Avatar />
          </Form.Group>
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
            <DatePicker
              onChange={(date) => (date ? setExpiry(date.unix()) : null)}
              defaultValue={moment(moment.unix(expiry), "YYYY-MM-DD")}
              format={"YYYY-MM-DD"}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-secondary"
            onClick={deleteItem}
            style={{ marginLeft: "1rem" }}
          >
            Delete
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PantryEditModal;
